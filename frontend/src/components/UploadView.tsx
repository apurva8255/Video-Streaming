import React, { useCallback, useRef, useState } from "react";
import { getUploadUrl, getVideoDuration, uploadToS3 } from "../api";

type UploadStatus = "idle" | "reading" | "uploading" | "success" | "error";

interface UploadViewProps {
  onSuccess: () => void;
}

export default function UploadView({ onSuccess }: UploadViewProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setStatus("idle");
    setErrorMsg("");
    setProgress(0);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);

  const handleUpload = async () => {
    if (!file) return;
    try {
      setStatus("reading");
      setProgress(0);
      const duration = await getVideoDuration(file);

      setStatus("uploading");
      const { signedUrl } = await getUploadUrl({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        duration,
      });

      await uploadToS3(signedUrl, file, (pct) => setProgress(pct));

      setStatus("success");
      setTimeout(() => onSuccess(), 1600);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
    if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const isUploading = status === "uploading" || status === "reading";

  return (
    <div className="animate-fade-up" style={{ maxWidth: 680, margin: "0 auto", padding: "32px 4% 64px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span className="brand-font" style={{ fontSize: "1.2rem", color: "var(--netflix-red)" }}>
            CLOUDFLIX
          </span>
          <span style={{ fontSize: "0.75rem", letterSpacing: "2px", fontWeight: 700, color: "#808080" }}>
            CREATOR STUDIO
          </span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
          Upload New Title
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Upload your raw video. S3 triggers the ECS worker to automatically transcode it into 360p, 480p, and 720p HLS renditions.
        </p>
      </div>

      {/* Netflix Drop zone */}
      <div
        id="upload-dropzone"
        onClick={() => !isUploading && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        style={{
          position: "relative",
          borderRadius: 6,
          border: `2px dashed ${
            isDragging
              ? "var(--netflix-red)"
              : file
              ? "rgba(229, 9, 20, 0.6)"
              : "rgba(255, 255, 255, 0.2)"
          }`,
          background: isDragging
            ? "rgba(229, 9, 20, 0.08)"
            : file
            ? "rgba(229, 9, 20, 0.04)"
            : "#181818",
          padding: "52px 32px",
          textAlign: "center",
          cursor: isUploading ? "default" : "pointer",
          transition: "all 0.25s ease",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".mp4,.mkv"
          style={{ display: "none" }}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {/* Cloudflix Upload Icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: file ? "var(--netflix-red)" : "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
            transition: "all 0.2s",
            boxShadow: file ? "0 0 20px var(--netflix-glow)" : "none",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {file ? (
          <div>
            <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>
              {file.name}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
              <span className="badge-outline">{formatSize(file.size)}</span>
              <span className="badge-outline">{file.type || "video/mp4"}</span>
            </div>
            {!isUploading && (
              <p style={{ marginTop: 14, fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Click or drop another file to change
              </p>
            )}
          </div>
        ) : (
          <div>
            <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: 6 }}>
              {isDragging ? "Drop your video file here" : "Drag and drop video here"}
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: 16 }}>
              or click to browse from your device
            </p>
            <span className="badge-outline">MP4 & MKV up to 2 GB</span>
          </div>
        )}
      </div>

      {/* Upload Progress Bar (Netflix Red) */}
      {isUploading && (
        <div style={{ marginTop: 24, background: "#181818", padding: "18px 20px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.88rem" }}>
            <span style={{ color: "#fff", fontWeight: 600 }}>
              {status === "reading" ? "Reading video metadata…" : `Uploading to S3… ${progress}%`}
            </span>
            <span style={{ color: "var(--netflix-red)", fontWeight: 700 }}>
              {progress}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "var(--netflix-red)",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Success Notification */}
      {status === "success" && (
        <div
          style={{
            marginTop: 20,
            padding: "16px 20px",
            background: "rgba(70, 211, 105, 0.12)",
            border: "1px solid rgba(70, 211, 105, 0.4)",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#46d369" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <p style={{ fontWeight: 700, color: "#46d369", margin: 0 }}>Uploaded successfully!</p>
            <p style={{ fontSize: "0.82rem", color: "#a3e9b5", margin: 0 }}>
              ECS Fargate task triggered for HLS transcoding. Redirecting…
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div
          style={{
            marginTop: 20,
            padding: "16px 20px",
            background: "rgba(229, 9, 20, 0.12)",
            border: "1px solid rgba(229, 9, 20, 0.4)",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--netflix-red)" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ color: "#ff858a", margin: 0, fontSize: "0.9rem" }}>{errorMsg}</p>
        </div>
      )}

      {/* Submit Button */}
      <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
        <button
          className="btn-netflix-red"
          onClick={handleUpload}
          disabled={!file || isUploading}
          style={{ flex: 1, padding: "14px", fontSize: "1.05rem" }}
        >
          {isUploading ? "Processing…" : "Start Upload & Transcode"}
        </button>
      </div>
    </div>
  );
}