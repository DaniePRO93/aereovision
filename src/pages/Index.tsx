import { useEffect, useMemo, useState, type CSSProperties } from "react";
import "@/styles/redesign.css";
import Reveal from "@/components/Reveal";
import PackageModal from "@/components/PackageModal";
import { services, steps } from "@/data/services";
import { INSTAGRAM_URL, waDirect, customWaLink, waLink } from "@/lib/whatsapp";

import residentialAerial from "@/assets/hero-carousel/residential-aerial.jpg";
import coastalAerial from "@/assets/hero-carousel/coastal-aerial.jpg";
import groupPhoto from "@/assets/hero-carousel/group-photo.jpg";
import bikeTrail from "@/assets/hero-carousel/bike-trail.jpg";
import showreelVideo from "@/assets/Acton family day or sports showreel.mov";
import actonLogo from "@/assets/clients/acton-logo.png";
import prometheusLogo from "@/assets/clients/prometheus-logo.png";

const mono: CSSProperties = { fontFamily: "'Space Mono', monospace" };
const eyebrow: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 11,
  fontFamily: "'Space Mono', monospace",
  fontSize: 12,
  letterSpacing: ".24em",
  textTransform: "uppercase",
  color: "#8A8170",
  marginBottom: 16,
};
const accentTick: CSSProperties = { width: 20, height: 2, background: "#E9A23B" };
const sectionH2: CSSProperties = {
  margin: 0,
  fontWeight: 900,
  fontSize: "clamp(34px, 5vw, 64px)",
  lineHeight: 0.98,
  letterSpacing: "-.015em",
};

const heroImages = [
  { src: residentialAerial, alt: "Aerial real estate" },
  { src: coastalAerial, alt: "Coastal aerial" },
  { src: groupPhoto, alt: "Aerial event coverage" },
  { src: bikeTrail, alt: "Action FPV trail" },
];

const testimonials = [
  {
    quote:
      "The aerial video made our listing stand out instantly — we had three showings booked within days of posting it. Fast, professional, and the footage looks incredible.",
    name: "Mariana Pérez",
    role: "Real estate agent · Antigua",
  },
  {
    quote:
      "They captured our event from angles we never could have imagined. The final edit was ready in two days and performed amazingly across all our social channels.",
    name: "Luis Hernández",
    role: "Marketing manager",
  },
  {
    quote:
      "Working with AeroVision was effortless. The drone footage of our property elevated our whole brand — guests mention the video all the time.",
    name: "Andrea Castillo",
    role: "Hotel owner",
  },
];

const faqs = [
  {
    q: "How fast do you deliver?",
    a: "Most shoots are edited and delivered within 24–72 hours of the flight. Need it sooner? A rush 24-hour delivery add-on is available on most packages.",
  },
  {
    q: "How do we book a shoot?",
    a: "Message us on WhatsApp with your location, the service you want and a rough date. We confirm the scope and a fixed price, then lock the shoot date — usually within a few days.",
  },
  {
    q: "Where do you shoot?",
    a: "We're based in Guatemala and shoot nationwide, with international and destination projects available on request. Travel beyond the metro area may add a small travel fee — we'll always quote it upfront.",
  },
  {
    q: "What's the difference between FPV and cinematic drone?",
    a: "FPV drones are fast and agile — perfect for immersive single-take fly-throughs and high-energy action. Cinematic drones fly smooth and stable for sweeping, polished reveals. We use both and pick the right tool for your shot.",
  },
  {
    q: "Can we request revisions?",
    a: "Yes — one revision round is included with every edited package so we can fine-tune the cut. Additional rounds are available if you want more changes.",
  },
  {
    q: "What do we receive?",
    a: "Depending on your package: a color-graded final film in both cinematic (16:9) and vertical (9:16) social cuts, plus high-resolution stills and raw clips on the higher tiers. Everything delivered organized over WhatsApp or Google Drive.",
  },
];

const Index = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    service: "Not sure yet — help me choose",
    message: "",
  });

  const openService = services.find((s) => s.id === openId) ?? null;

  // Hero crossfade rotation.
  useEffect(() => {
    const timer = window.setInterval(
      () => setHeroIndex((i) => (i + 1) % heroImages.length),
      5200
    );
    return () => window.clearInterval(timer);
  }, []);

  // Nav background on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serviceOptions = useMemo(
    () => ["Not sure yet — help me choose", ...services.map((s) => s.title)],
    []
  );

  const formWaLink = useMemo(() => {
    let msg = `Hi AeroVision! I'm ${form.name || "[name]"}. `;
    msg += `I'm interested in: ${form.service}. `;
    if (form.message) msg += form.message;
    return waLink(msg);
  }, [form]);

  return (
    <div className="av-root" id="top">
      {/* ============ NAV ============ */}
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
          borderBottom: scrolled
            ? "1px solid rgba(28,22,14,.1)"
            : "1px solid rgba(28,22,14,.07)",
          background: scrolled ? "rgba(246,242,234,.93)" : "rgba(246,242,234,.8)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(12px)",
          boxShadow: scrolled ? "0 6px 24px rgba(20,16,10,.06)" : "none",
          transition: "background .4s ease, border-color .4s ease, box-shadow .4s ease",
        }}
      >
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "#1E1813",
          }}
        >
          <span style={{ fontWeight: 900, fontSize: 19, letterSpacing: ".14em" }}>
            AERO<span style={{ color: "#E9A23B" }}>VISION</span>
          </span>
        </a>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(14px, 2.4vw, 36px)",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {[
            { label: "Work", href: "#work" },
            { label: "Services", href: "#services" },
            { label: "Process", href: "#process" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="av-navlink av-mono"
              style={{
                fontSize: 12.5,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="av-pill"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#221A0C",
              fontWeight: 800,
              fontSize: 13.5,
              letterSpacing: ".02em",
              padding: "11px 20px",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(233,162,59,.25)",
            }}
          >
            Get a quote
          </a>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {heroImages.map((img, i) => (
          <img
            key={img.src}
            className="av-hero-img"
            src={img.src}
            alt={img.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === heroIndex ? 1 : 0,
              transition: "opacity 1.6s ease",
              animation: "av-kenburns 16s ease-in-out infinite alternate",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(246,242,234,.62) 0%, rgba(246,242,234,.12) 24%, rgba(246,242,234,.5) 56%, rgba(246,242,234,.97) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 90% at 72% 26%, rgba(233,162,59,.07) 0%, rgba(246,242,234,0) 46%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 200px 36px rgba(246,242,234,.6)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px) clamp(40px, 7vh, 84px)",
          }}
        >
          <Reveal
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(11px, 1.1vw, 13px)",
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: "#2A2218",
              marginBottom: 22,
              textShadow: "0 1px 12px rgba(246,242,234,.95)",
            }}
          >
            <span style={{ width: 22, height: 2, background: "#E9A23B" }} />
            Aerial Film &amp; Drone Studio
          </Reveal>
          <Reveal delay={90}>
            <h1
              style={{
                margin: 0,
                fontWeight: 900,
                fontSize: "clamp(46px, 8.5vw, 124px)",
                lineHeight: 0.92,
                letterSpacing: "-.02em",
                maxWidth: "16ch",
                textShadow: "0 1px 22px rgba(246,242,234,.9)",
              }}
            >
              Aerial footage that <span style={{ color: "#E9A23B" }}>sells the scene.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p
              style={{
                margin: "26px 0 0",
                maxWidth: "56ch",
                fontSize: "clamp(16px, 1.5vw, 20px)",
                lineHeight: 1.55,
                color: "#4A4236",
              }}
            >
              Real estate, events, tourism and brand films — captured from the sky and
              color-graded to stop the scroll. Booked over WhatsApp in minutes.
            </p>
          </Reveal>
          <Reveal delay={270} style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
            <a
              href="#contact"
              className="av-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                color: "#221A0C",
                fontWeight: 800,
                fontSize: 16,
                padding: "16px 30px",
                borderRadius: 100,
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(233,162,59,.3)",
              }}
            >
              Get a quote <span style={mono}>→</span>
            </a>
          </Reveal>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            className="av-mono"
            style={{ fontSize: 10, letterSpacing: ".3em", color: "rgba(28,22,14,.5)" }}
          >
            SCROLL
          </span>
          <span
            style={{
              display: "block",
              width: 1,
              height: 26,
              background: "linear-gradient(#E9A23B, transparent)",
              animation: "av-cue 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ============ CLIENTS / TRUST ============ */}
      <section
        style={{
          borderTop: "1px solid rgba(28,22,14,.09)",
          borderBottom: "1px solid rgba(28,22,14,.09)",
          background: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px clamp(20px, 5vw, 64px)" }}>
          <div
            className="av-mono"
            style={{
              textAlign: "center",
              fontSize: 11,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "#857B6A",
              marginBottom: 34,
            }}
          >
            Trusted by teams across Guatemala
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(40px, 8vw, 96px)",
            }}
          >
            <img src={actonLogo} alt="Acton Academy Guatemala" style={{ height: 78, width: "auto", display: "block" }} />
            <img
              src={prometheusLogo}
              alt="PrometheusFest del CEES"
              style={{ height: 60, width: "auto", display: "block", borderRadius: 7 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(30px, 6vw, 68px)",
              marginTop: 46,
              paddingTop: 38,
              borderTop: "1px solid rgba(28,22,14,.08)",
            }}
          >
            {[
              { v: "50+", l: "Projects delivered" },
              { v: "4K·6K", l: "Cinematic capture" },
              { v: "24–72h", l: "Typical delivery" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div className="av-mono" style={{ fontWeight: 700, fontSize: 24, color: "#1E1813" }}>
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#857B6A",
                    marginTop: 4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section
        id="work"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(70px, 11vh, 130px) clamp(20px, 5vw, 64px)",
        }}
      >
        <Reveal
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 18,
            marginBottom: 46,
          }}
        >
          <div>
            <div style={eyebrow}>
              <span style={accentTick} />
              Selected Work
            </div>
            <h2 style={sectionH2}>
              Shot from above,
              <br />
              graded for impact.
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: "34ch", fontSize: 15, lineHeight: 1.6, color: "#6E6556" }}>
            A glimpse of real AeroVision work. Every frame is captured, stabilized and
            color-graded in-house.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {/* Showreel video */}
          <Reveal
            className="av-tile"
            style={{
              position: "relative",
              gridColumn: "1 / -1",
              minWidth: 0,
              aspectRatio: "16 / 9",
              borderRadius: 6,
              overflow: "hidden",
              background: "#17140F",
            }}
          >
            <video
              src={showreelVideo}
              poster={groupPhoto}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(12,10,7,.05) 40%, rgba(12,10,7,.78) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 22,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(12,10,7,.55)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,.16)",
                borderRadius: 100,
                padding: "7px 14px",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#E9A23B",
                  boxShadow: "0 0 10px #E9A23B",
                }}
              />
              <span
                className="av-mono"
                style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#fff" }}
              >
                Showreel
              </span>
            </div>
            <div style={{ position: "absolute", left: 24, bottom: 22, right: 24, pointerEvents: "none" }}>
              <div className="av-mono" style={{ fontSize: 11, letterSpacing: ".2em", color: "#E9A23B" }}>
                EVENTS / SPORTS
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(20px, 2.6vw, 28px)",
                  marginTop: 5,
                  color: "#FFFFFF",
                }}
              >
                Acton family day &amp; sports showreel
              </div>
            </div>
          </Reveal>

          {/* Image tiles */}
          {[
            { src: residentialAerial, span: 2, ratio: "16 / 10", cat: "REAL ESTATE", title: "Hillside residential community", delay: 0 },
            { src: bikeTrail, span: 1, ratio: "4 / 5", cat: "FPV / ACTION", title: "Downhill trail chase", delay: 80 },
            { src: groupPhoto, span: 1, ratio: "4 / 5", cat: "EVENTS", title: "Overhead group portrait", delay: 0 },
            { src: coastalAerial, span: 2, ratio: "16 / 10", cat: "TOURISM", title: "Pacific coastline & mangroves", delay: 80 },
          ].map((tile) => (
            <Reveal
              key={tile.title}
              delay={tile.delay}
              className="av-tile"
              style={{
                position: "relative",
                gridColumn: tile.span === 2 ? "span 2" : undefined,
                minWidth: 0,
                aspectRatio: tile.ratio,
                borderRadius: 4,
                overflow: "hidden",
                background: "#FFFFFF",
              }}
            >
              <img
                src={tile.src}
                alt={tile.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(12,10,7,0) 45%, rgba(12,10,7,.88) 100%)",
                }}
              />
              <div style={{ position: "absolute", left: 22, bottom: 20, right: 22 }}>
                <div className="av-mono" style={{ fontSize: 11, letterSpacing: ".2em", color: "#E9A23B" }}>
                  {tile.cat}
                </div>
                <div style={{ fontWeight: 800, fontSize: 19, marginTop: 4, color: "#FFFFFF" }}>
                  {tile.title}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(28,22,14,.09)" }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(70px, 11vh, 130px) clamp(20px, 5vw, 64px)",
          }}
        >
          <Reveal style={{ marginBottom: 50 }}>
            <div style={eyebrow}>
              <span style={accentTick} />
              Services &amp; Packages
            </div>
            <h2 style={{ ...sectionH2, maxWidth: "18ch" }}>
              Pick a service. See the price. Message us.
            </h2>
            <p style={{ margin: "20px 0 0", maxWidth: "52ch", fontSize: 16, lineHeight: 1.6, color: "#6E6556" }}>
              Transparent, tiered pricing with optional add-ons. Build your package and it lands
              in our WhatsApp ready to book.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 16,
            }}
          >
            {services.map((svc) => (
              <Reveal
                key={svc.id}
                className="av-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  background: "#FFFFFF",
                  border: "1px solid rgba(28,22,14,.10)",
                  borderRadius: 6,
                  padding: 26,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  <span
                    className="av-mono"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "#B5731A",
                    }}
                  >
                    {svc.tag}
                  </span>
                </div>
                <h3 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>
                  {svc.title}
                </h3>
                <p style={{ margin: "0 0 20px", fontSize: 14.5, lineHeight: 1.55, color: "#6E6556", flex: 1 }}>
                  {svc.blurb}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "0 0 22px",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  {svc.highlights.map((hl) => (
                    <li
                      key={hl}
                      style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#564C3E" }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#E9A23B",
                          marginTop: 7,
                          flexShrink: 0,
                        }}
                      />
                      {hl}
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: 12,
                    paddingTop: 18,
                    borderTop: "1px solid rgba(28,22,14,.09)",
                  }}
                >
                  <div>
                    <div
                      className="av-mono"
                      style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#857B6A" }}
                    >
                      Starting from
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 26, color: "#1E1813" }}>${svc.from}</div>
                  </div>
                  <button
                    onClick={() => setOpenId(svc.id)}
                    className="av-viewpkg"
                    style={{
                      background: "rgba(233,162,59,.12)",
                      color: "#E9A23B",
                      fontWeight: 800,
                      fontSize: 13.5,
                      border: "1px solid rgba(233,162,59,.32)",
                      borderRadius: 100,
                      padding: "11px 18px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    View packages →
                  </button>
                </div>
              </Reveal>
            ))}

            {/* Custom quote card */}
            <Reveal
              className="av-card"
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                background: "#17140F",
                border: "1px solid #17140F",
                borderRadius: 6,
                padding: 26,
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <span
                  className="av-mono"
                  style={{ fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#E9A23B" }}
                >
                  Custom
                </span>
              </div>
              <h3 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 22, lineHeight: 1.1, color: "#FFFFFF" }}>
                Something else in mind?
              </h3>
              <p style={{ margin: "0 0 20px", fontSize: 14.5, lineHeight: 1.55, color: "#B7AE9D", flex: 1 }}>
                Multi-day shoots, combined services, a campaign or a project that doesn't fit a
                package — tell us what you need and we'll build a quote around it.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: "0 0 22px",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {["Tailored scope & pricing", "Combine any services", "Reply within a few hours"].map((it) => (
                  <li key={it} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#D8CFBE" }}>
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#E9A23B",
                        marginTop: 7,
                        flexShrink: 0,
                      }}
                    />
                    {it}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 12,
                  paddingTop: 18,
                  borderTop: "1px solid rgba(255,255,255,.12)",
                }}
              >
                <div>
                  <div
                    className="av-mono"
                    style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#8A8170" }}
                  >
                    Pricing
                  </div>
                  <div style={{ fontWeight: 900, fontSize: 26, color: "#FFFFFF" }}>Custom quote</div>
                </div>
                <a
                  href={customWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="av-cta"
                  style={{
                    color: "#221A0C",
                    fontWeight: 800,
                    fontSize: 13.5,
                    borderRadius: 100,
                    padding: "11px 18px",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  Get a quote →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section
        id="process"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(70px, 11vh, 130px) clamp(20px, 5vw, 64px)",
        }}
      >
        <Reveal style={{ marginBottom: 50 }}>
          <div style={eyebrow}>
            <span style={accentTick} />
            How a shoot works
          </div>
          <h2 style={sectionH2}>From message to final cut.</h2>
        </Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 1,
            background: "rgba(28,22,14,.09)",
            border: "1px solid rgba(28,22,14,.09)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {steps.map((step) => (
            <Reveal
              key={step.n}
              style={{
                background: "#FFFFFF",
                padding: "30px 24px 34px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                minHeight: 220,
              }}
            >
              <div className="av-mono" style={{ fontSize: 13, color: "#E9A23B", letterSpacing: ".1em" }}>
                {step.n}
              </div>
              <div style={{ fontWeight: 800, fontSize: 19, lineHeight: 1.15 }}>{step.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "#6E6556" }}>{step.desc}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" style={{ background: "#FFFFFF", borderTop: "1px solid rgba(28,22,14,.09)" }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(70px, 11vh, 130px) clamp(20px, 5vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
            gap: "clamp(40px, 6vw, 90px)",
            alignItems: "start",
          }}
        >
          <Reveal>
            <div style={eyebrow}>
              <span style={accentTick} />
              Book your shoot
            </div>
            <h2 style={{ ...sectionH2, fontSize: "clamp(34px, 5vw, 62px)" }}>
              Let's get your shoot on the calendar.
            </h2>
            <p style={{ margin: "22px 0 32px", maxWidth: "44ch", fontSize: 16, lineHeight: 1.6, color: "#6E6556" }}>
              Tell us what you need and roughly when. We usually reply within a few hours and can
              shoot within days.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380 }}>
              <a
                href={waDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="av-cta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  color: "#221A0C",
                  fontWeight: 800,
                  fontSize: 16,
                  padding: "17px 24px",
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                WhatsApp us now <span style={mono}>→</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="av-soft"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: "rgba(28,22,14,.05)",
                  color: "#1E1813",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "17px 24px",
                  borderRadius: 8,
                  textDecoration: "none",
                  border: "1px solid rgba(28,22,14,.16)",
                }}
              >
                See more on Instagram <span style={mono}>↗</span>
              </a>
            </div>
            <div
              className="av-mono"
              style={{ marginTop: 30, fontSize: 12, letterSpacing: ".06em", color: "#857B6A" }}
            >
              Typical reply: under 3 hours · Mon–Sun
            </div>
          </Reveal>

          <Reveal
            delay={120}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(28,22,14,.1)",
              borderRadius: 10,
              padding: "clamp(24px, 3vw, 36px)",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 22 }}>Quick quote request</div>
            <label
              className="av-mono"
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#857B6A",
                marginBottom: 8,
              }}
            >
              Your name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Jane Doe"
              className="av-input"
              style={{
                width: "100%",
                background: "#FFFFFF",
                border: "1px solid rgba(28,22,14,.16)",
                borderRadius: 7,
                color: "#1E1813",
                fontSize: 15,
                padding: "13px 15px",
                marginBottom: 18,
                outline: "none",
              }}
            />
            <label
              className="av-mono"
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#857B6A",
                marginBottom: 8,
              }}
            >
              What do you need?
            </label>
            <select
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              className="av-input"
              style={{
                width: "100%",
                background: "#FFFFFF",
                border: "1px solid rgba(28,22,14,.16)",
                borderRadius: 7,
                color: "#1E1813",
                fontSize: 15,
                padding: "13px 15px",
                marginBottom: 18,
                outline: "none",
                cursor: "pointer",
              }}
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <label
              className="av-mono"
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#857B6A",
                marginBottom: 8,
              }}
            >
              Details &amp; rough date
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="e.g. Aerial video for a house listing in Antigua, next weekend."
              rows={4}
              className="av-input"
              style={{
                width: "100%",
                background: "#FFFFFF",
                border: "1px solid rgba(28,22,14,.16)",
                borderRadius: 7,
                color: "#1E1813",
                fontSize: 15,
                padding: "13px 15px",
                marginBottom: 22,
                outline: "none",
                resize: "vertical",
                lineHeight: 1.5,
              }}
            />
            <a
              href={formWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="av-cta"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "#221A0C",
                fontWeight: 800,
                fontSize: 16,
                padding: 16,
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Send via WhatsApp
            </a>
            <div style={{ textAlign: "center", fontSize: 12, color: "#857B6A", marginTop: 12 }}>
              Opens WhatsApp with your message pre-filled.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid rgba(28,22,14,.09)" }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(70px, 11vh, 130px) clamp(20px, 5vw, 64px)",
          }}
        >
          <Reveal
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 18,
              marginBottom: 46,
            }}
          >
            <div>
              <div style={eyebrow}>
                <span style={accentTick} />
                What clients say
              </div>
              <h2 style={sectionH2}>
                Work that books
                <br />
                the next job.
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="av-mono" style={{ fontWeight: 700, fontSize: 40, color: "#E9A23B" }}>
                20+
              </div>
              <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#857B6A" }}>
                Happy clients
              </div>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 16,
            }}
          >
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 80}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(28,22,14,.1)",
                  borderRadius: 8,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ color: "#E9A23B", fontSize: 18, letterSpacing: 3, marginBottom: 16 }}>
                  ★★★★★
                </div>
                <p style={{ margin: "0 0 22px", fontSize: 16, lineHeight: 1.6, color: "#2A2218", flex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ paddingTop: 18, borderTop: "1px solid rgba(28,22,14,.1)" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1E1813" }}>{t.name}</div>
                  <div className="av-mono" style={{ fontSize: 12, color: "#857B6A", marginTop: 4 }}>
                    {t.role}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section
        className="av-faq"
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "clamp(70px, 11vh, 130px) clamp(20px, 5vw, 64px)",
        }}
      >
        <Reveal style={{ marginBottom: 44 }}>
          <div style={eyebrow}>
            <span style={accentTick} />
            Questions
          </div>
          <h2 style={{ ...sectionH2, fontSize: "clamp(34px, 5vw, 60px)" }}>Good to know.</h2>
        </Reveal>
        <Reveal style={{ borderTop: "1px solid rgba(28,22,14,.12)" }}>
          {faqs.map((faq) => (
            <details key={faq.q} style={{ borderBottom: "1px solid rgba(28,22,14,.12)" }}>
              <summary
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "22px 4px",
                  fontWeight: 700,
                  fontSize: "clamp(17px, 2vw, 21px)",
                  color: "#1E1813",
                }}
              >
                {faq.q}
                <span
                  className="av-plus"
                  style={{ color: "#E9A23B", fontSize: 26, fontWeight: 400, flexShrink: 0 }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  margin: "0 0 24px",
                  padding: "0 4px",
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "#6E6556",
                  maxWidth: "70ch",
                }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </Reveal>
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
            <div style={{ fontWeight: 800, fontSize: 19 }}>Still have a question?</div>
            <div style={{ fontSize: 14.5, color: "#6E6556", marginTop: 4 }}>
              Ask us directly — we usually reply within a few hours.
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
            Ask on WhatsApp →
          </a>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: ".14em" }}>
              AERO<span style={{ color: "#E9A23B" }}>VISION</span>
            </span>
            <span className="av-mono" style={{ fontSize: 12, color: "#857B6A", marginLeft: 8 }}>
              aerovision.gt
            </span>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="av-navlink av-mono"
              style={{ fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Instagram
            </a>
            <a
              href={waDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="av-navlink av-mono"
              style={{ fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none" }}
            >
              WhatsApp
            </a>
            <a
              href="#top"
              className="av-navlink av-mono"
              style={{ fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Back to top ↑
            </a>
          </div>
          <div className="av-mono" style={{ fontSize: 11, color: "#A99F8F", width: "100%" }}>
            © 2026 AeroVision — Aerial film &amp; drone studio.
          </div>
        </div>
      </footer>

      {/* ============ FLOATING WHATSAPP ============ */}
      <a
        className="av-wa"
        href={waDirect}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        style={{
          position: "fixed",
          right: "clamp(16px, 3vw, 30px)",
          bottom: "clamp(16px, 3vw, 30px)",
          zIndex: 40,
          display: "inline-flex",
          alignItems: "center",
          background: "#25D366",
          color: "#fff",
          fontWeight: 800,
          fontSize: 15,
          padding: 14,
          borderRadius: 100,
          textDecoration: "none",
          boxShadow: "0 12px 34px rgba(18,140,70,.4)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 2.05.56 4.04 1.62 5.79L4.9 27.1l6.43-1.68a11.02 11.02 0 0 0 4.7 1.05h.01c6.11 0 11.06-4.95 11.06-11.06S22.15 4 16.04 4zm0 20.2h-.01c-1.5 0-2.97-.4-4.26-1.17l-.3-.18-3.82 1 1.02-3.72-.2-.31a9.16 9.16 0 0 1-1.4-4.88c0-5.06 4.12-9.18 9.18-9.18 2.45 0 4.76.96 6.49 2.69a9.13 9.13 0 0 1 2.69 6.5c0 5.06-4.12 9.17-9.18 9.17zm5.03-6.87c-.27-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.61.14-.18.27-.7.9-.86 1.08-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.36-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.46-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.27-.96.94-.96 2.3 0 1.36.98 2.67 1.12 2.85.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.18-.52-.32z" />
          </svg>
        </span>
        <span className="av-wa-label">Contact us!</span>
      </a>

      {/* ============ PACKAGE MODAL ============ */}
      {openService && <PackageModal service={openService} onClose={() => setOpenId(null)} />}
    </div>
  );
};

export default Index;
