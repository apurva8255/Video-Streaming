import "media-chrome";
import "media-chrome/menu";
import "hls-video-element";
import type { Video } from "../types";

// Style the quality-selector dropdown to match Netflix
const QUALITY_MENU_STYLES = `
  media-rendition-selectmenu {
    --media-menu-background: #181818;
    --media-menu-border: 1px solid rgba(255,255,255,0.18);
    --media-menu-border-radius: 4px;
    --media-menu-box-shadow: 0 8px 32px rgba(0,0,0,0.85);
    --media-menu-item-hover-background: rgba(229, 9, 20, 0.35);
    --media-menu-item-checked-background: rgba(229, 9, 20, 0.85);
    --media-font-family: 'Inter', system-ui, sans-serif;
  }
`;

if (!document.getElementById("quality-menu-styles")) {
  const style = document.createElement("style");
  style.id = "quality-menu-styles";
  style.textContent = QUALITY_MENU_STYLES;
  document.head.appendChild(style);
}

interface PlayerProps {
  videoUrl: string;
  video: Video;
  onBack: () => void;
}

function formatDuration(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0)
    return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export default function Player({ videoUrl, video, onBack }: PlayerProps) {
  // Proxy CloudFront requests through /cdn on localhost
  const url = videoUrl.replace(
    /^https:\/\/d2tqc45o39v2m3\.cloudfront\.net/,
    "/cdn",
  );

  return (
    <div
      className="animate-fade-up"
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "16px 4% 64px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* ── Top Bar with Netflix Back button ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <button
          className="btn-ghost"
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            fontSize: "0.92rem",
            color: "#fff",
            background: "rgba(0,0,0,0.6)",
            borderRadius: 4,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Browse
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="brand-font" style={{ fontSize: "1.4rem", color: "var(--netflix-red)", letterSpacing: "1px" }}>
            CLOUDFLIX
          </span>
          <span className="badge-outline">PREVIEW MODE</span>
        </div>
      </div>

      {/* ── Cinematic Media Chrome Video Player ── */}
      <div
        style={{
          borderRadius: 6,
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 24px 60px rgba(0,0,0,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <media-controller>
          <hls-video
            slot="media"
            src={url}
            crossOrigin="use-credentials"
            preload="auto"
          />
          <media-loading-indicator slot="centered-chrome" noautohide="" />
          <media-control-bar>
            <media-play-button />
            <media-mute-button />
            <media-volume-range />
            <media-time-display showduration="" />
            <media-time-range />
            <media-playback-rate-button />
            <media-rendition-selectmenu />
            <media-pip-button />
            <media-fullscreen-button />
          </media-control-bar>
        </media-controller>
      </div>

      {/* ── Title Header & Badges ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span className="brand-font" style={{ fontSize: "1.2rem", color: "var(--netflix-red)", letterSpacing: "1px" }}>
            CLOUDFLIX
          </span>
          <span style={{ fontSize: "0.75rem", letterSpacing: "2px", fontWeight: 700, color: "#aaa" }}>
            ORIGINAL STREAM
          </span>
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
          {video.videoName}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
          <span style={{ color: "#46d369", fontWeight: 800, fontSize: "0.95rem" }}>
            99% Match
          </span>
          <span className="badge-outline">U/A 16+</span>
          <span style={{ color: "#fff", fontSize: "0.9rem" }}>
            {formatDuration(video.duration)}
          </span>
          <span className="badge-outline">Ultra HD</span>
          <span className="badge-outline">5.1 Audio</span>
          <span className="badge-outline">HLS Adaptive</span>
        </div>
      </div>

      {/* ── Netflix Info / Metadata Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          background: "#181818",
          padding: "24px 28px",
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {[
          { label: "STREAM NAME", value: video.videoName },
          { label: "DURATION", value: formatDuration(video.duration) },
          { label: "ORIGINAL SIZE", value: formatSize(video.originalSize) },
          { label: "DELIVERY", value: "HLS Multi-Rung (360p / 480p / 720p)" },
          { label: "EDGE CDN", value: "AWS CloudFront (Signed Cookies)" },
          { label: "AUDIO CODEC", value: "AAC @ 48 kHz" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p
              style={{
                fontSize: "0.72rem",
                color: "#808080",
                marginBottom: 4,
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            >
              {label}
            </p>
            <p style={{ color: "#ffffff", fontWeight: 500, fontSize: "0.92rem" }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}