import React, { useState, useEffect } from "react";

interface LayoutProps {
  activeView: "list" | "upload" | "player" | "play-url";
  onNavigate: (view: "list" | "upload" | "play-url") => void;
  children: React.ReactNode;
}

export default function Layout({ activeView, onNavigate, children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh", background: "#141414" }}>
      {/* ── Netflix Top Navigation ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: isScrolled
            ? "rgba(20, 20, 20, 0.98)"
            : "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(20,20,20,0) 100%)",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          transition: "background 0.3s ease",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            padding: "0 4%",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          {/* Left: Brand Logo + Primary Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {/* Cloudflix Logo */}
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              onClick={() => onNavigate("list")}
            >
              <span
                className="brand-font"
                style={{
                  fontSize: "2.3rem",
                  color: "var(--netflix-red)",
                  textShadow: "0 2px 14px rgba(229, 9, 20, 0.5)",
                  userSelect: "none",
                  letterSpacing: "1.5px",
                  lineHeight: 1,
                  display: "inline-block",
                  transform: "scaleY(1.08)",
                }}
              >
                CLOUDFLIX
              </span>
            </div>

            {/* Navigation links */}
            <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
              {[
                { id: "list", label: "Home" },
                { id: "upload", label: "Upload Stream" },
                { id: "play-url", label: "Play from URL" },
              ].map(({ id, label }) => {
                const isActive = activeView === id || (activeView === "player" && id === "list");
                return (
                  <button
                    key={id}
                    onClick={() => onNavigate(id as "list" | "upload" | "play-url")}
                    style={{
                      background: "none",
                      border: "none",
                      color: isActive ? "#ffffff" : "#b3b3b3",
                      fontWeight: isActive ? 700 : 400,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      padding: "6px 0",
                      position: "relative",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#e5e5e5";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#b3b3b3";
                    }}
                  >
                    {label}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: 2,
                          backgroundColor: "var(--netflix-red)",
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Search / Actions / Netflix Profile Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Quick Upload Button */}
            <button
              className="btn-netflix-red"
              onClick={() => onNavigate("upload")}
              style={{
                padding: "7px 16px",
                fontSize: "0.84rem",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upload
            </button>

            {/* Notification Bell */}
            <div
              style={{ color: "#e5e5e5", cursor: "pointer", display: "flex", alignItems: "center" }}
              title="Notifications"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Classic Netflix Smiling Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                backgroundColor: "#E50914",
                background: "linear-gradient(135deg, #E50914 0%, #B81D24 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              title="Cloudflix Account"
            >
              {/* Smiling avatar face */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <circle cx="8" cy="9" r="1.5" />
                <circle cx="16" cy="9" r="1.5" />
                <path d="M8 14c1.5 2 6.5 2 8 0" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main style={{ flex: 1, position: "relative" }}>
        {children}
      </main>

      {/* ── Netflix-Style Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: 64,
          padding: "48px 4% 32px",
          color: "#757575",
          fontSize: "0.85rem",
          maxWidth: 1400,
          width: "100%",
          marginInline: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span className="brand-font" style={{ fontSize: "1.4rem", color: "var(--netflix-red)" }}>
            CLOUDFLIX
          </span>
          <span style={{ color: "#555" }}>• Cloud-Native HLS Video Streaming</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>Audio Description</div>
          <div>Help Center</div>
          <div>Media Center</div>
          <div>Investor Relations</div>
          <div>Terms of Use</div>
          <div>Privacy Policy</div>
          <div>AWS Infrastructure</div>
          <div>Corporate Information</div>
        </div>
        <div style={{ fontSize: "0.78rem", color: "#555" }}>
          © 2026 Cloudflix, Inc. Powered by AWS Fargate, S3, CloudFront & FFmpeg.
        </div>
      </footer>
    </div>
  );
}