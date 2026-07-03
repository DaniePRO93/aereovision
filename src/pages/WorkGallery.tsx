import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "@/styles/redesign.css";
import Reveal from "@/components/Reveal";
import { getCategory, workCategories } from "@/data/work";
import { waDirect, INSTAGRAM_URL } from "@/lib/whatsapp";

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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px",
          gap: 22,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--av-font-display)",
            fontWeight: 600,
            fontSize: "clamp(28px,5vw,48px)",
            margin: 0,
          }}
        >
          Galería <span className="av-serif av-grad-text">no encontrada.</span>
        </h1>
        <Link to="/#work" className="av-cta">
          ← Volver al trabajo
        </Link>
      </div>
    );
  }

  const otherCats = workCategories.filter((c) => c.slug !== cat.slug);

  return (
    <div className="av-root" id="top">
      <div className="av-grain" aria-hidden="true" />

      {/* ---- Minimal header ---- */}
      <header className="av-nav av-nav--solid">
        <Link to="/" className="av-wordmark">
          AERO<em>VISION</em>
        </Link>
        <nav className="av-navlinks">
          <Link to="/#work" className="av-navlink">
            ← Todo el trabajo
          </Link>
          <a
            href={waDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="av-cta av-cta--sm"
          >
            Cotizar
          </a>
        </nav>
      </header>

      {/* ---- Title + feature media ---- */}
      <section
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding:
            "calc(72px + clamp(40px, 8vh, 90px)) var(--av-pad-x) clamp(40px, 7vh, 70px)",
        }}
      >
        <Reveal>
          <div className="av-eyebrow">{cat.tag}</div>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--av-font-display)",
              fontWeight: 600,
              fontSize: "clamp(36px, 6vw, 76px)",
              lineHeight: 0.98,
              letterSpacing: "-.015em",
              color: "var(--av-text)",
            }}
          >
            {cat.label}
          </h1>
          <p className="av-lead" style={{ margin: "20px 0 0", maxWidth: "56ch" }}>
            {cat.blurb}
          </p>
        </Reveal>

        <Reveal className="av-mat">
          {cat.embedUrl ? (
            <iframe
              src={cat.embedUrl}
              title={cat.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : cat.featureVideo || cat.video ? (
            <video
              src={cat.featureVideo ?? cat.video}
              poster={cat.cover}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls
            />
          ) : (
            <img src={cat.cover} alt={cat.label} />
          )}
        </Reveal>
      </section>

      {/* ---- Gallery grid ---- */}
      <section
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding: "0 var(--av-pad-x) clamp(70px, 11vh, 120px)",
        }}
      >
        <div className="av-galgrid">
          {cat.items.map((item, i) => (
            <Reveal key={`${item.src}-${i}`} className="av-gal-item">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                />
              ) : (
                <img src={item.src} alt={item.caption ?? cat.label} />
              )}
              {item.caption && (
                <>
                  <div className="av-caption-shade" />
                  <div className="av-caption">{item.caption}</div>
                </>
              )}
            </Reveal>
          ))}
        </div>

        {/* More-coming + CTA */}
        <Reveal className="av-askband">
          <div style={{ flex: 1, minWidth: 220 }}>
            <div
              style={{ fontFamily: "var(--av-font-display)", fontWeight: 600, fontSize: 19 }}
            >
              Más {cat.label.toLowerCase()} próximamente.
            </div>
            <div style={{ fontSize: 14.5, color: "var(--av-text2)", marginTop: 5 }}>
              ¿Quieres este tipo de grabación para tu proyecto? Escríbenos y te enviamos
              ejemplos recientes.
            </div>
          </div>
          <a
            href={waDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="av-cta av-cta--sm"
            style={{ whiteSpace: "nowrap" }}
          >
            Reservar grabación →
          </a>
        </Reveal>
      </section>

      {/* ---- Explore other categories ---- */}
      <section className="av-band">
        <div
          style={{
            maxWidth: 1340,
            margin: "0 auto",
            padding: "clamp(50px, 8vh, 90px) var(--av-pad-x)",
          }}
        >
          <div className="av-eyebrow" style={{ marginBottom: 26 }}>
            Más trabajo
          </div>
          <div className="av-minigrid">
            {otherCats.map((c) => (
              <Link
                key={c.slug}
                to={`/work/${c.slug}`}
                className="av-tile"
                style={{ aspectRatio: "4 / 5" }}
              >
                <img className="av-tile-cover" src={c.cover} alt={c.label} />
                <div className="av-tile-shade" />
                <div className="av-tile-meta">
                  <div style={{ minWidth: 0 }}>
                    <div className="av-tile-tag" style={{ fontSize: 9.5 }}>
                      {c.tag}
                    </div>
                    <div className="av-tile-title" style={{ fontSize: 17 }}>
                      {c.label}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="av-footer">
        <div className="av-foot-row">
          <Link to="/" className="av-wordmark" style={{ fontSize: 17 }}>
            AERO<em>VISION</em>
          </Link>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="av-navlink"
            >
              Instagram
            </a>
            <a href={waDirect} target="_blank" rel="noopener noreferrer" className="av-navlink">
              WhatsApp
            </a>
            <Link to="/" className="av-navlink">
              Inicio ↑
            </Link>
          </div>
          <div className="av-foot-copy" style={{ width: "100%" }}>
            © 2026 AeroVision — Estudio de cine aéreo y drones · aerovision.gt
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WorkGallery;
