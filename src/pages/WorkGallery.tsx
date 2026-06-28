import { useEffect, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import "@/styles/redesign.css";
import Reveal from "@/components/Reveal";
import { getCategory, workCategories } from "@/data/work";
import { waDirect, INSTAGRAM_URL } from "@/lib/whatsapp";

const mono: CSSProperties = { fontFamily: "'Space Mono', monospace" };

const WorkGallery = () => {
  const { slug } = useParams();
  const cat = getCategory(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Unknown category → simple fallback.
  if (!cat) {
    return (
      <div
        className="av-root"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px", gap: 18 }}
      >
        <h1 style={{ fontWeight: 900, fontSize: "clamp(28px,5vw,48px)", margin: 0 }}>Galería no encontrada</h1>
        <Link to="/#work" className="av-cta" style={{ color: "#221A0C", fontWeight: 800, padding: "14px 24px", borderRadius: 100, textDecoration: "none" }}>
← Volver al trabajo
        </Link>
      </div>
    );
  }

  const otherCats = workCategories.filter((c) => c.slug !== cat.slug);

  return (
    <div className="av-root" id="top">
      {/* ---- Minimal header ---- */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "16px clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid rgba(28,22,14,.1)",
          background: "rgba(246,242,234,.93)",
          backdropFilter: "blur(14px)",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#1E1813" }}>
          <span style={{ fontWeight: 900, fontSize: 19, letterSpacing: ".14em" }}>
            AERO<span style={{ color: "#E9A23B" }}>VISION</span>
          </span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2.4vw, 28px)" }}>
          <Link
            to="/#work"
            className="av-navlink av-mono"
            style={{ fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none" }}
          >
← Todo el trabajo
          </Link>
          <a
            href={waDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="av-pill"
            style={{
              color: "#221A0C",
              fontWeight: 800,
              fontSize: 13.5,
              padding: "11px 20px",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(233,162,59,.25)",
            }}
          >
            Cotizar
          </a>
        </nav>
      </header>

      {/* ---- Title + feature media ---- */}
      <section
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "calc(72px + clamp(40px, 8vh, 90px)) clamp(20px, 5vw, 64px) clamp(40px, 7vh, 70px)",
        }}
      >
        <Reveal>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 11,
              ...mono,
              fontSize: 12,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "#8A8170",
              marginBottom: 16,
            }}
          >
            <span style={{ width: 20, height: 2, background: "#E9A23B" }} />
            {cat.tag}
          </div>
          <h1 style={{ margin: 0, fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1, letterSpacing: "-.015em" }}>
            {cat.label}
          </h1>
          <p style={{ margin: "18px 0 0", maxWidth: "56ch", fontSize: 16, lineHeight: 1.6, color: "#6E6556" }}>
            {cat.blurb}
          </p>
        </Reveal>

        <Reveal
          style={{
            marginTop: 36,
            position: "relative",
            borderRadius: 8,
            overflow: "hidden",
            background: "#17140F",
            aspectRatio: "16 / 9",
          }}
        >
          {cat.embedUrl ? (
            <iframe
              src={cat.embedUrl}
              title={cat.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          ) : cat.video ? (
            <video
              src={cat.video}
              poster={cat.cover}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <img src={cat.cover} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </Reveal>
      </section>

      {/* ---- Gallery grid ---- */}
      <section style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px) clamp(70px, 11vh, 120px)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {cat.items.map((item, i) => (
            <Reveal
              key={`${item.src}-${i}`}
              delay={(i % 3) * 80}
              style={{
                position: "relative",
                borderRadius: 6,
                overflow: "hidden",
                background: "#17140F",
                aspectRatio: "4 / 3",
              }}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <img src={item.src} alt={item.caption ?? cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              )}
              {item.caption && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(12,10,7,0) 55%, rgba(12,10,7,.8) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{ position: "absolute", left: 16, bottom: 14, right: 16, color: "#fff", fontWeight: 700, fontSize: 14, pointerEvents: "none" }}
                  >
                    {item.caption}
                  </div>
                </>
              )}
            </Reveal>
          ))}
        </div>

        {/* More-coming + CTA */}
        <Reveal
          style={{
            marginTop: 40,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 16,
            background: "#FFFFFF",
            border: "1px solid rgba(28,22,14,.1)",
            borderRadius: 10,
            padding: "26px 28px",
          }}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 800, fontSize: 19 }}>Más {cat.label.toLowerCase()} próximamente.</div>
            <div style={{ fontSize: 14.5, color: "#6E6556", marginTop: 4 }}>
              ¿Quieres este tipo de grabación para tu proyecto? Escríbenos y te enviamos ejemplos recientes.
            </div>
          </div>
          <a
            href={waDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="av-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: "#221A0C",
              fontWeight: 800,
              fontSize: 15,
              padding: "14px 24px",
              borderRadius: 100,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
Reservar grabación →
          </a>
        </Reveal>
      </section>

      {/* ---- Explore other categories ---- */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid rgba(28,22,14,.09)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(50px, 8vh, 90px) clamp(20px, 5vw, 64px)" }}>
          <div
            className="av-mono"
            style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: "#8A8170", marginBottom: 24 }}
          >
            Más trabajo
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {otherCats.map((c) => (
              <Link
                key={c.slug}
                to={`/work/${c.slug}`}
                className="av-tile"
                style={{
                  position: "relative",
                  display: "block",
                  aspectRatio: "4 / 5",
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "#17140F",
                  textDecoration: "none",
                }}
              >
                <img src={c.cover} alt={c.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,10,7,0) 45%, rgba(12,10,7,.85) 100%)" }} />
                <div style={{ position: "absolute", left: 16, bottom: 14, right: 16 }}>
                  <div className="av-mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "#E9A23B" }}>
                    {c.tag}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 16, marginTop: 3, color: "#fff" }}>{c.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer style={{ borderTop: "1px solid rgba(28,22,14,.09)", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "44px clamp(20px, 5vw, 64px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#1E1813" }}>
            <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: ".14em" }}>
              AERO<span style={{ color: "#E9A23B" }}>VISION</span>
            </span>
          </Link>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="av-navlink av-mono" style={{ fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none" }}>
              Instagram
            </a>
            <a href={waDirect} target="_blank" rel="noopener noreferrer" className="av-navlink av-mono" style={{ fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none" }}>
              WhatsApp
            </a>
            <Link to="/" className="av-navlink av-mono" style={{ fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none" }}>
              Inicio ↑
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkGallery;
