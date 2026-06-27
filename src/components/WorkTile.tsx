import { useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { WorkCategory } from "@/data/work";

const mono: CSSProperties = { fontFamily: "'Space Mono', monospace" };

/**
 * A Work category tile. Shows a poster image; if the category has a video it
 * plays on hover (paused/poster otherwise — keeps the grid calm and minimal).
 * Clicking navigates to the category's gallery page.
 */
const WorkTile = ({ cat, style }: { cat: WorkCategory; style?: CSSProperties }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (v) {
      v.style.opacity = "1";
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.style.opacity = "0";
    }
  };

  const titleSize = cat.feature ? "clamp(20px, 2.6vw, 28px)" : 19;

  return (
    <Link
      to={`/work/${cat.slug}`}
      className="av-tile"
      onMouseEnter={play}
      onMouseLeave={stop}
      style={{
        position: "relative",
        display: "block",
        minWidth: 0,
        aspectRatio: cat.aspect,
        borderRadius: cat.feature ? 6 : 4,
        overflow: "hidden",
        background: "#17140F",
        textDecoration: "none",
        ...style,
      }}
    >
      <img
        src={cat.cover}
        alt={cat.tileTitle}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {cat.video && (
        <video
          ref={videoRef}
          src={cat.video}
          muted
          loop
          playsInline
          preload="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: 0,
            transition: "opacity .35s ease",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(12,10,7,0) 45%, rgba(12,10,7,.88) 100%)",
          pointerEvents: "none",
        }}
      />

      {cat.video && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(12,10,7,.55)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.16)",
            borderRadius: 100,
            padding: "6px 12px",
            pointerEvents: "none",
          }}
        >
          <span
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#E9A23B", boxShadow: "0 0 10px #E9A23B" }}
          />
          <span
            className="av-mono"
            style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#fff" }}
          >
            Video
          </span>
        </div>
      )}

      <div style={{ position: "absolute", left: 20, bottom: 18, right: 20, pointerEvents: "none" }}>
        <div className="av-mono" style={{ fontSize: 11, letterSpacing: ".2em", color: "#E9A23B" }}>
          {cat.tag}
        </div>
        <div style={{ fontWeight: 800, fontSize: titleSize, marginTop: 4, color: "#FFFFFF" }}>
          {cat.tileTitle}
        </div>
        <div
          className="av-mono"
          style={{ fontSize: 11, letterSpacing: ".12em", color: "rgba(255,255,255,.7)", marginTop: 8 }}
        >
          View gallery →
        </div>
      </div>
    </Link>
  );
};

export default WorkTile;
