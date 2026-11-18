import { useCallback, useEffect, useState } from "react";
import { listVideos } from "../api";
import type { Video } from "../types";

interface VideoListProps {
  onPlay: (video: Video) => void;
<<<<<<< HEAD
  onNavigateUpload?: () => void;
=======
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
}

function formatDuration(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
<<<<<<< HEAD
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
=======
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

<<<<<<< HEAD
/** Cinematic dark gradient for video card thumbnails */
function cardBackdrop(id: string): string {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradients = [
    "radial-gradient(circle at 70% 30%, #59191d 0%, #1e090a 60%, #0d0405 100%)",
    "radial-gradient(circle at 60% 40%, #1b3252 0%, #0c1829 60%, #060c14 100%)",
    "radial-gradient(circle at 75% 25%, #3d2459 0%, #1a0f26 60%, #09050e 100%)",
    "radial-gradient(circle at 65% 35%, #593519 0%, #26160a 60%, #0e0804 100%)",
    "radial-gradient(circle at 50% 50%, #195945 0%, #0a261d 60%, #040e0b 100%)",
  ];
  return gradients[hash % gradients.length];
=======
/** Deterministic pastel gradient per video id */
function cardGradient(id: string): string {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const hues: [number, number][] = [
    [255, 200], [200, 160], [160, 290], [290, 330], [330, 50],
  ];
  const [h1, h2] = hues[hash % hues.length];
  return `linear-gradient(135deg, hsl(${h1},70%,20%) 0%, hsl(${h2},60%,15%) 100%)`;
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
}

function VideoCardSkeleton() {
  return (
<<<<<<< HEAD
    <div className="skeleton" style={{ height: 180, borderRadius: 4 }} />
=======
    <div className="glass-card" style={{ overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 160 }} />
      <div style={{ padding: "16px 18px" }}>
        <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 14, width: "40%" }} />
      </div>
    </div>
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
  );
}

export default function VideoList({ onPlay }: VideoListProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await listVideos();
<<<<<<< HEAD
      setVideos(data.videos || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load videos from server");
=======
      setVideos(data.videos);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load videos");
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);
=======
  useEffect(() => { fetchVideos(); }, [fetchVideos]);
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea

  const filtered = videos.filter((v) =>
    v.videoName.toLowerCase().includes(search.toLowerCase()),
  );

<<<<<<< HEAD
  const heroVideo = filtered.length > 0 ? filtered[0] : null;

  return (
    <div style={{ paddingBottom: 64 }}>
      {/* ── 1. Netflix Hero Billboard Banner ── */}
      {heroVideo && !search && (
        <section
          style={{
            position: "relative",
            minHeight: "520px",
            marginTop: -68, // Flow under the transparent header
            paddingTop: 120,
            paddingBottom: 60,
            paddingInline: "4%",
            display: "flex",
            alignItems: "flex-end",
            background: `linear-gradient(180deg, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0.7) 70%, #141414 100%), ${cardBackdrop(heroVideo._id)}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0 30px 90px rgba(0,0,0,0.8)",
          }}
        >
          {/* Subtle noise/grid overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.6) 45%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 10, maxWidth: 680 }}>
            {/* Netflix Series / Original Tag */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span className="brand-font" style={{ fontSize: "1.3rem", color: "var(--netflix-red)", letterSpacing: "2px" }}>
                CLOUDFLIX
              </span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "3px", fontWeight: 700, color: "#e5e5e5", textTransform: "uppercase" }}>
                FEATURED STREAM
              </span>
            </div>

            {/* Video Title */}
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 16,
                textShadow: "0 4px 20px rgba(0,0,0,0.9)",
              }}
            >
              {heroVideo.videoName}
            </h1>

            {/* Badges / Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ color: "#46d369", fontWeight: 800, fontSize: "0.95rem" }}>
                98% Match
              </span>
              <span className="badge-outline">U/A 16+</span>
              <span style={{ color: "#e5e5e5", fontSize: "0.88rem" }}>
                {formatDuration(heroVideo.duration)}
              </span>
              <span className="badge-outline">HD</span>
              <span className="badge-outline">HLS ABR</span>
              <span style={{ color: "#aaa", fontSize: "0.82rem" }}>
                {formatSize(heroVideo.originalSize)}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                color: "#e5e5e5",
                fontSize: "1rem",
                lineHeight: 1.5,
                marginBottom: 28,
                maxWidth: 580,
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              Streamed in adaptive bitrate HLS (360p, 480p, 720p) with CloudFront edge acceleration.
              Ready for instant low-latency playback.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <button
                className="btn-netflix-white"
                onClick={() => onPlay(heroVideo)}
                style={{ minWidth: 140 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4l15 8-15 8z" />
                </svg>
                Play
              </button>
              <button
                className="btn-netflix-gray"
                onClick={() => onPlay(heroVideo)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                </svg>
                Stream Info
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. Content Sections ── */}
      <div style={{ padding: "0 4%", marginTop: heroVideo && !search ? 16 : 24 }}>
        {/* Search & Header Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
              {search ? `Search results for "${search}"` : "Trending on Cloudflix"}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 4 }}>
              {loading ? "Fetching streams…" : `${videos.length} title${videos.length !== 1 ? "s" : ""} available`}
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* Search Box */}
            <div style={{ position: "relative" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="2"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Titles, genres, files…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  paddingLeft: 38,
                  paddingRight: 14,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  fontSize: "0.88rem",
                  outline: "none",
                  width: 240,
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--netflix-red)";
                  e.target.style.background = "rgba(0,0,0,0.9)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.2)";
                  e.target.style.background = "rgba(0,0,0,0.6)";
                }}
              />
            </div>

            {/* Refresh Button */}
            <button
              className="btn-ghost"
              onClick={fetchVideos}
              title="Refresh video catalog"
              style={{ padding: "8px 14px" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              border: "1px solid rgba(229,9,20,0.4)",
              background: "rgba(229,9,20,0.12)",
              borderRadius: 4,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--netflix-red)" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
            </svg>
            <p style={{ color: "#ff858a", margin: 0, fontSize: "0.9rem" }}>{error}</p>
            <button
              className="btn-ghost"
              onClick={fetchVideos}
              style={{ marginLeft: "auto", padding: "6px 14px", fontSize: "0.8rem" }}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── 3. Video Grid (Netflix Tile Layout) ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <VideoCardSkeleton key={i} />)
            : filtered.length === 0
            ? (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "90px 24px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  border: "1px dashed rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(229,9,20,0.1)",
                    border: "1px solid rgba(229,9,20,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--netflix-red)" strokeWidth="1.8">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "#fff", marginBottom: 8 }}>
                  {search ? "No matching titles found" : "Your Cloudflix library is empty"}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: 420, margin: "0 auto" }}>
                  {search
                    ? "Try searching with a different keyword or file name."
                    : "Upload a video file (.mp4 or .mkv) to start event-driven transcoding and stream here."}
                </p>
              </div>
            )
            : filtered.map((video, i) => (
              <NetflixVideoCard
                key={video._id}
                video={video}
                index={i}
                onPlay={onPlay}
              />
            ))}
        </div>
=======
  return (
    <div className="animate-fade-up">
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: 6 }}>My Videos</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            {loading ? "Loading…" : `${videos.length} video${videos.length !== 1 ? "s" : ""} uploaded`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              id="video-search-input"
              type="text"
              placeholder="Search videos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                paddingLeft: 38,
                paddingRight: 14,
                paddingTop: 9,
                paddingBottom: 9,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                background: "var(--bg-input)",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                outline: "none",
                width: 220,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
          <button className="btn-ghost" onClick={fetchVideos} style={{ padding: "9px 14px" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="glass-card"
          style={{
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            borderColor: "rgba(244,63,94,0.3)",
            background: "rgba(244,63,94,0.08)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          <p style={{ color: "#fda4af" }}>{error}</p>
          <button className="btn-ghost" onClick={fetchVideos} style={{ marginLeft: "auto" }}>
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <VideoCardSkeleton key={i} />)
          : filtered.length === 0
          ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "80px 24px",
                color: "var(--text-muted)",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="1.2"
                style={{ margin: "0 auto 16px" }}
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" strokeLinecap="round" />
              </svg>
              <p style={{ fontSize: "1rem", marginBottom: 8 }}>
                {search ? "No videos match your search" : "No videos yet"}
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                {search ? "Try a different term" : "Upload your first video to get started"}
              </p>
            </div>
          )
          : filtered.map((video, i) => (
            <VideoCard key={video._id} video={video} index={i} onPlay={onPlay} />
          ))}
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
      </div>
    </div>
  );
}

<<<<<<< HEAD
function NetflixVideoCard({
=======
function VideoCard({
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
  video,
  index,
  onPlay,
}: {
  video: Video;
  index: number;
  onPlay: (v: Video) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
<<<<<<< HEAD
      className="netflix-card"
=======
      id={`video-card-${video._id}`}
      className="glass-card"
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
      onClick={() => onPlay(video)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
<<<<<<< HEAD
        animation: `fadeSlideUp 0.35s ${Math.min(index * 0.04, 0.4)}s ease both`,
      }}
    >
      {/* 16:9 Thumbnail Poster */}
      <div
        style={{
          aspectRatio: "16 / 9",
          background: cardBackdrop(video._id),
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 12,
          overflow: "hidden",
        }}
      >
        {/* Top Badges */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="brand-font" style={{ fontSize: "1.1rem", color: "var(--netflix-red)" }}>
            C
          </span>
          {index < 3 && (
            <span className="badge-top10">TOP 10</span>
          )}
        </div>

        {/* Center Play Button on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hovered ? "rgba(0,0,0,0.4)" : "transparent",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: hovered ? "var(--netflix-red)" : "rgba(0, 0, 0, 0.6)",
              border: "2px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered ? "scale(1.15)" : "scale(1)",
              transition: "transform 0.2s, background-color 0.2s",
              boxShadow: hovered ? "0 0 18px var(--netflix-glow)" : "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}>
              <path d="M6 4l15 8-15 8z" />
            </svg>
          </div>
        </div>

        {/* Bottom indicators */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 2 }}>
          <span
            style={{
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              fontSize: "0.72rem",
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: 2,
            }}
          >
            {formatDuration(video.duration)}
          </span>
          <span className="badge-outline">HD</span>
        </div>

        {/* Netflix Red Bottom Progress Line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              width: hovered ? "100%" : "35%",
              height: "100%",
              backgroundColor: "var(--netflix-red)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Card Info Details */}
      <div style={{ padding: "12px 14px", background: "#181818" }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: "0.94rem",
            color: "#fff",
=======
        overflow: "hidden",
        animation: `fadeSlideUp 0.35s ${index * 0.05}s ease both`,
      }}
    >
      {/* Thumbnail placeholder */}
      <div
        style={{
          height: 160,
          background: cardGradient(video._id),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transition: "opacity 0.2s",
          opacity: hovered ? 0.9 : 1,
        }}
      >
        {/* Play overlay */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: hovered ? "rgba(124,58,237,0.85)" : "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s",
            boxShadow: hovered ? "0 0 24px var(--accent-glow)" : "none",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>

        {/* Duration badge */}
        <span
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          {formatDuration(video.duration)}
        </span>

        {/* HLS badge */}
        <span
          className="badge badge-purple"
          style={{ position: "absolute", top: 10, left: 10 }}
        >
          HLS
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "var(--text-primary)",
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
            marginBottom: 6,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={video.videoName}
        >
          {video.videoName}
        </p>
<<<<<<< HEAD

        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem" }}>
          <span style={{ color: "#46d369", fontWeight: 700 }}>98% Match</span>
          <span className="badge-outline">16+</span>
          <span style={{ color: "#808080" }}>{formatSize(video.originalSize)}</span>
          <span style={{ color: "#808080", marginLeft: "auto" }}>HLS</span>
=======
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            💾 {formatSize(video.originalSize)}
          </span>
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7b679675a67f4b624241954935733585fc5b37ea
