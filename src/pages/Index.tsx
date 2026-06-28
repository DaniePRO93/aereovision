import { useEffect, useMemo, useState, type CSSProperties } from "react";
import "@/styles/redesign.css";
import Reveal from "@/components/Reveal";
import PackageModal from "@/components/PackageModal";
import WorkTile from "@/components/WorkTile";
import { services, steps } from "@/data/services";
import { workCategories, type WorkCategory } from "@/data/work";
import accionSalto from "@/assets/work/accion-salto.mp4";
import accionSaltoPoster from "@/assets/work/accion-salto-poster.jpg";
import { INSTAGRAM_URL, waDirect, customWaLink, waLink } from "@/lib/whatsapp";

import residentialAerial from "@/assets/hero-carousel/residential-aerial.jpg";
import coastalAerial from "@/assets/hero-carousel/coastal-aerial.jpg";
import groupPhoto from "@/assets/hero-carousel/group-photo.jpg";
import bikeTrail from "@/assets/hero-carousel/bike-trail.jpg";
import actonLogo from "@/assets/clients/acton-logo.png";
import prometheusLogo from "@/assets/clients/prometheus-logo.png";
import ufmLogo from "@/assets/clients/UFM logo.png";

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
  fontWeight: 800,
  fontSize: "clamp(28px, 4vw, 48px)",
  lineHeight: 1.02,
  letterSpacing: "-.015em",
};

const heroImages = [
  { src: residentialAerial, alt: "Aerial real estate" },
  { src: coastalAerial, alt: "Coastal aerial" },
  { src: groupPhoto, alt: "Aerial event coverage" },
  { src: bikeTrail, alt: "Action FPV trail" },
];

// Full-width jump highlight shown below the Casas feature; links to /work/accion.
const saltoShowcase: WorkCategory = {
  slug: "accion",
  tag: "EN ACCIÓN",
  tileTitle: "Salto en bici",
  label: "Acción",
  blurb: "",
  cover: accionSaltoPoster,
  video: accionSalto,
  aspect: "16 / 9",
  items: [],
};

const testimonials = [
  {
    quote:
      "El video aéreo hizo que nuestra propiedad destacara al instante — tuvimos tres visitas agendadas a los pocos días de publicarlo. Rápidos, profesionales y el material se ve increíble.",
    name: "Mariana Pérez",
    role: "Agente de bienes raíces · Antigua",
  },
  {
    quote:
      "Capturaron nuestro evento desde ángulos que jamás habríamos imaginado. La edición final estuvo lista en dos días y funcionó increíble en todas nuestras redes.",
    name: "Luis Hernández",
    role: "Gerente de marketing",
  },
  {
    quote:
      "Trabajar con AeroVision fue facilísimo. Las tomas con drone de nuestra propiedad elevaron toda nuestra marca — los huéspedes mencionan el video todo el tiempo.",
    name: "Andrea Castillo",
    role: "Dueña de hotel",
  },
];

const faqs = [
  {
    q: "¿Qué tan rápido entregan?",
    a: "La mayoría de las grabaciones se editan y entregan dentro de 24–72 horas del vuelo. ¿La necesitas antes? Hay un extra de entrega urgente en 24 horas disponible en la mayoría de paquetes.",
  },
  {
    q: "¿Cómo reservamos una grabación?",
    a: "Escríbenos por WhatsApp con tu ubicación, el servicio que quieres y una fecha aproximada. Confirmamos el alcance y un precio fijo, y agendamos la fecha — normalmente en pocos días.",
  },
  {
    q: "¿Dónde graban?",
    a: "Estamos en Guatemala y grabamos a nivel nacional, con proyectos internacionales y de destino disponibles bajo solicitud. Viajar fuera del área metropolitana puede tener un pequeño costo de viaje — siempre lo cotizamos por adelantado.",
  },
  {
    q: "¿Cuál es la diferencia entre FPV y drone cinematográfico?",
    a: "Los drones FPV son rápidos y ágiles — perfectos para recorridos inmersivos de una sola toma y acción de alta energía. Los drones cinematográficos vuelan suaves y estables para tomas amplias y pulidas. Usamos ambos y elegimos la herramienta ideal para tu toma.",
  },
  {
    q: "¿Podemos pedir cambios?",
    a: "Sí — una ronda de cambios viene incluida en cada paquete editado para afinar el corte. Hay rondas adicionales disponibles si quieres más cambios.",
  },
  {
    q: "¿Qué recibimos?",
    a: "Según tu paquete: un video final con colorización en formato cinematográfico (16:9) y vertical (9:16) para redes, además de fotos en alta resolución y clips en bruto en los niveles superiores. Todo entregado organizado por WhatsApp o Google Drive.",
  },
];

const Index = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    service: "Aún no estoy seguro — ayúdenme a elegir",
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
    () => ["Aún no estoy seguro — ayúdenme a elegir", ...services.map((s) => s.title)],
    []
  );

  const formWaLink = useMemo(() => {
    let msg = `¡Hola AeroVision! Soy ${form.name || "[nombre]"}. `;
    msg += `Me interesa: ${form.service}. `;
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
            { label: "Trabajo", href: "#work" },
            { label: "Servicios", href: "#services" },
            { label: "Proceso", href: "#process" },
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
            Cotizar
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
          <Reveal>
            <h1
              style={{
                margin: 0,
                fontWeight: 800,
                fontSize: "clamp(32px, 5.2vw, 64px)",
                lineHeight: 1.02,
                letterSpacing: "-.02em",
                maxWidth: "18ch",
                textShadow: "0 1px 22px rgba(246,242,234,.9)",
              }}
            >
              Tomas aéreas que <span style={{ color: "#E9A23B" }}>venden la escena.</span>
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
              Bienes raíces, eventos, turismo y videos de marca — capturados desde el cielo
              y con colorización profesional para detener el scroll. Reserva por WhatsApp en minutos.
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
              Cotizar <span style={mono}>→</span>
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
            DESLIZA
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
            Con la confianza de equipos en Guatemala
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
            <img src={ufmLogo} alt="Universidad Francisco Marroquín" style={{ height: 64, width: "auto", display: "block" }} />
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
              { v: "50+", l: "Proyectos entregados" },
              { v: "4K·6K", l: "Captura cinematográfica" },
              { v: "24–72h", l: "Entrega típica" },
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
              Trabajo Seleccionado
            </div>
            <h2 style={sectionH2}>
              Tomado desde el cielo,
              <br />
              editado para impactar.
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: "34ch", fontSize: 15, lineHeight: 1.6, color: "#6E6556" }}>
            Una muestra del trabajo real de AeroVision. Cada toma es capturada, estabilizada y
            con colorización propia.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {/* Casas feature (full width) */}
          {workCategories
            .filter((cat) => cat.feature)
            .map((cat) => (
              <Reveal key={cat.slug} style={{ gridColumn: "1 / -1" }}>
                <WorkTile cat={cat} />
              </Reveal>
            ))}

          {/* Jump highlight, full width, right below Casas */}
          <Reveal style={{ gridColumn: "1 / -1" }}>
            <WorkTile cat={saltoShowcase} />
          </Reveal>

          {/* Remaining categories */}
          {workCategories
            .filter((cat) => !cat.feature)
            .map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 3) * 80}>
                <WorkTile cat={cat} />
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
              Servicios y Paquetes
            </div>
            <h2 style={{ ...sectionH2, maxWidth: "18ch" }}>
              Elige un servicio. Mira el precio. Escríbenos.
            </h2>
            <p style={{ margin: "20px 0 0", maxWidth: "52ch", fontSize: 16, lineHeight: 1.6, color: "#6E6556" }}>
              Precios transparentes por niveles con extras opcionales. Arma tu paquete y llega a
              nuestro WhatsApp listo para reservar.
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
                      Desde
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
                    Ver paquetes →
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
                  A medida
                </span>
              </div>
              <h3 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 22, lineHeight: 1.1, color: "#FFFFFF" }}>
                ¿Tienes algo más en mente?
              </h3>
              <p style={{ margin: "0 0 20px", fontSize: 14.5, lineHeight: 1.55, color: "#B7AE9D", flex: 1 }}>
                Grabaciones de varios días, servicios combinados, una campaña o un proyecto que no
                encaja en un paquete — cuéntanos qué necesitas y armamos una cotización a tu medida.
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
                {["Alcance y precio a medida", "Combina cualquier servicio", "Respondemos en pocas horas"].map((it) => (
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
                    Precio
                  </div>
                  <div style={{ fontWeight: 900, fontSize: 26, color: "#FFFFFF" }}>Cotización a medida</div>
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
                  Cotizar →
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
            Cómo funciona una grabación
          </div>
          <h2 style={sectionH2}>Del mensaje al corte final.</h2>
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
              Reserva tu grabación
            </div>
            <h2 style={{ ...sectionH2, fontSize: "clamp(28px, 4vw, 46px)" }}>
              Agendemos tu grabación.
            </h2>
            <p style={{ margin: "22px 0 32px", maxWidth: "44ch", fontSize: 16, lineHeight: 1.6, color: "#6E6556" }}>
              Cuéntanos qué necesitas y más o menos cuándo. Normalmente respondemos en pocas horas
              y podemos grabar en días.
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
                Escríbenos por WhatsApp <span style={mono}>→</span>
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
                Ver más en Instagram <span style={mono}>↗</span>
              </a>
            </div>
            <div
              className="av-mono"
              style={{ marginTop: 30, fontSize: 12, letterSpacing: ".06em", color: "#857B6A" }}
            >
              Respuesta típica: menos de 3 horas · Lun–Dom
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
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 22 }}>Cotización rápida</div>
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
              Tu nombre
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Juan Pérez"
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
              ¿Qué necesitas?
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
              Detalles y fecha aproximada
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="ej. Video aéreo para una casa en venta en Antigua, el próximo fin de semana."
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
              Enviar por WhatsApp
            </a>
            <div style={{ textAlign: "center", fontSize: 12, color: "#857B6A", marginTop: 12 }}>
              Abre WhatsApp con tu mensaje listo.
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
                Lo que dicen los clientes
              </div>
              <h2 style={sectionH2}>
                Trabajo que consigue
                <br />
                el siguiente proyecto.
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="av-mono" style={{ fontWeight: 700, fontSize: 40, color: "#E9A23B" }}>
                20+
              </div>
              <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#857B6A" }}>
                Clientes satisfechos
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
            Preguntas
          </div>
          <h2 style={{ ...sectionH2, fontSize: "clamp(28px, 4vw, 44px)" }}>Bueno saberlo.</h2>
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
            <div style={{ fontWeight: 800, fontSize: 19 }}>¿Aún tienes una pregunta?</div>
            <div style={{ fontSize: 14.5, color: "#6E6556", marginTop: 4 }}>
              Pregúntanos directamente — normalmente respondemos en pocas horas.
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
            Pregunta por WhatsApp →
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
              Volver arriba ↑
            </a>
          </div>
          <div className="av-mono" style={{ fontSize: 11, color: "#A99F8F", width: "100%" }}>
            © 2026 AeroVision — Estudio de cine aéreo y drones.
          </div>
        </div>
      </footer>

      {/* ============ FLOATING WHATSAPP ============ */}
      <a
        className="av-wa"
        href={waDirect}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contáctanos por WhatsApp"
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
        <span className="av-wa-label">¡Escríbenos!</span>
      </a>

      {/* ============ PACKAGE MODAL ============ */}
      {openService && <PackageModal service={openService} onClose={() => setOpenId(null)} />}
    </div>
  );
};

export default Index;
