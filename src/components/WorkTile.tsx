import { useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { WorkCategory } from "@/data/work";

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

  const titleSize = cat.feature ? "clamp(22px, 2.8vw, 32px)" : "clamp(19px, 2vw, 22px)";

  return (
    <Link
      to={`/work/${cat.slug}`}
      className="av-tile"
      onMouseEnter={play}
      onMouseLeave={stop}
      style={{ aspectRatio: cat.aspect, ...style }}
    >
      <img className="av-tile-cover" src={cat.cover} alt={cat.tileTitle} />
      {cat.video && (
        <video
          ref={videoRef}
          className="av-tile-video"
          src={cat.video}
          muted
          loop
          playsInline
          preload="none"
        />
      )}

      <div className="av-tile-shade" />

      {cat.video && (
        <div className="av-badge">
          <i />
          <span>Video</span>
        </div>
      )}

      <div className="av-tile-meta">
        <div style={{ minWidth: 0 }}>
          <div className="av-tile-tag">{cat.tag}</div>
          <div className="av-tile-title" style={{ fontSize: titleSize }}>
            {cat.tileTitle}
          </div>
        </div>
        <span className="av-tile-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
};

export default WorkTile;
