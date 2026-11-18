import React, { useState } from "react";

interface PlayUrlViewProps {
  onPlay: (url: string) => void;
}

export default function PlayUrlView({ onPlay }: PlayUrlViewProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onPlay(url);
  };

  const sampleStreams = [
    {
      title: "Big Buck Bunny (ABR Test)",
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    },
    {
      title: "Tears of Steel (4K HLS)",
      url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    },
  ];

  return (
    <div className="animate-fade-up" style={{ maxWidth: 680, margin: "0 auto", padding: "32px 4% 64px" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span className="brand-font" style={{ fontSize: "1.2rem", color: "var(--netflix-red)" }}>
            CLOUDFLIX
          </span>
          <span style={{ fontSize: "0.75rem", letterSpacing: "2px", fontWeight: 700, color: "#808080" }}>
            EXTERNAL PLAYER
          </span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: 8 }}>
          Play from Stream URL
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Paste any HLS manifest URL (<code style={{ color: "var(--netflix-red)" }}>.m3u8</code>) to play it immediately in the Cloudflix player.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#181818",
          padding: "32px",
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: 8, fontSize: "0.92rem", fontWeight: 600, color: "#fff" }}>
            HLS Stream URL (.m3u8)
          </label>
          <input
            type="url"
            required
            placeholder="https://example.com/video/master.m3u8"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: "0.95rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--netflix-red)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
          />
        </div>

        <button
          type="submit"
          className="btn-netflix-red"
          style={{ justifyContent: "center", padding: "13px", fontSize: "1rem" }}
          disabled={!url}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4l15 8-15 8z" />
          </svg>
          Stream on Cloudflix
        </button>

        {/* Quick Test Links */}
        <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
          <p style={{ fontSize: "0.8rem", color: "#808080", marginBottom: 10, textTransform: "uppercase", letterSpacing: "1px" }}>
            Try Quick Sample Streams:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sampleStreams.map((sample) => (
              <button
                key={sample.title}
                type="button"
                onClick={() => setUrl(sample.url)}
                style={{
                  textAlign: "left",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 4,
                  padding: "8px 12px",
                  color: "#e5e5e5",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{sample.title}</span>
                <span style={{ color: "var(--netflix-red)", fontSize: "0.78rem" }}>Use this ➜</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}