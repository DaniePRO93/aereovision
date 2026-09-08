import { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/redesign.css";
import Reveal from "@/components/Reveal";
import PackageModal from "@/components/PackageModal";
import WorkTile from "@/components/WorkTile";
import { services, steps } from "@/data/services";
import { workCategories, type WorkCategory } from "@/data/work";
import accionSalto from "@/assets/work/accion-salto.mp4";
import accionSaltoPoster from "@/assets/work/accion-salto-poster.jpg";
import homePullout from "@/assets/work/home-pullout.mp4";
import { INSTAGRAM_URL, waDirect, customWaLink, waLink } from "@/lib/whatsapp";

import residentialAerial from "@/assets/hero-carousel/residential-aerial.jpg";
import coastalAerial from "@/assets/hero-carousel/coastal-aerial.jpg";
import groupPhoto from "@/assets/hero-carousel/group-photo.jpg";
import bikeTrail from "@/assets/hero-carousel/bike-trail.jpg";
import actonLogo from "@/assets/clients/acton-logo.png";
import prometheusLogo from "@/assets/clients/prometheus-logo.png";
import ufmLogo from "@/assets/clients/UFM logo.png";
import { createHomeJsonLd, usePageSeo } from "@/lib/seo";

const heroImages = [
  { src: residentialAerial, alt: "Toma aérea de bienes raíces" },
  { src: coastalAerial, alt: "Costa desde el aire" },
  { src: groupPhoto, alt: "Cobertura aérea de eventos" },
  { src: bikeTrail, alt: "Sendero de acción FPV" },
];

const marqueeItems = [
  "Bienes raíces",
  "Eventos",
  "Turismo",
  "Acción FPV",
  "Marcas",
  "Captura 4K · 6K",
  "Colorización de cine",
  "Guatemala",
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
  const [videoReady, setVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    service: "Aún no estoy seguro — ayúdenme a elegir",
    message: "",
  });

  const openService = services.find((s) => s.id === openId) ?? null;
  const homeJsonLd = useMemo(() => createHomeJsonLd(), []);

  usePageSeo({
    title: "AeroVision | Video Aéreo, Fotografía con Drone y FPV en Guatemala",
    description:
      "AeroVision crea video aéreo cinematográfico, fotografía con drone, tours FPV y contenido para bienes raíces, eventos, turismo y marcas en Guatemala.",
    path: "/drones",
    jsonLd: homeJsonLd,
  });

  // Hero crossfade rotation (stops once the video takes over).
  useEffect(() => {
    if (videoReady) return;
    const timer = window.setInterval(
      () => setHeroIndex((i) => (i + 1) % heroImages.length),
      5200
    );
    return () => window.clearInterval(timer);
  }, [videoReady]);

  // Force-start the hero video. React doesn't render the `muted` attribute
  // into the DOM (only the property), so browser autoplay policies can block
  // playback — mute explicitly and kick off play(), retrying on first
  // interaction for strict mobile browsers.
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => {
      if (v.paused) void v.play().catch(() => {});
    };
    tryPlay();
    // The mount-time attempt can race the media load — retry once data arrives.
    v.addEventListener("loadedmetadata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    const onFirstTouch = () => tryPlay();
    window.addEventListener("pointerdown", onFirstTouch, { once: true });
    window.addEventListener("touchstart", onFirstTouch, { once: true });
    return () => {
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      window.removeEventListener("pointerdown", onFirstTouch);
      window.removeEventListener("touchstart", onFirstTouch);
    };
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
      <div className="av-grain" aria-hidden="true" />

      {/* ============ NAV ============ */}
      <header className={`av-nav ${scrolled ? "av-nav--solid" : ""}`}>
        <a href="#top" className="av-wordmark">
          AERO<em>VISION</em>
        </a>
        <nav className="av-navlinks">
          {[
            { label: "Trabajo", href: "#work" },
            { label: "Servicios", href: "#services" },
            { label: "Proceso", href: "#process" },
          ].map((link) => (
            <a key={link.href} href={link.href} className="av-navlink">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="av-cta av-cta--sm">
            Cotizar
          </a>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section className="av-hero">
        {heroImages.map((img, i) => (
          <img
            key={img.src}
            className="av-hero-img"
            src={img.src}
            alt={img.alt}
            style={{ opacity: !videoReady && i === heroIndex ? 1 : 0 }}
          />
        ))}
        <video
          ref={heroVideoRef}
          className="av-hero-video"
          src={homePullout}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlaying={() => setVideoReady(true)}
          style={{ opacity: videoReady ? 1 : 0 }}
        />
        <div className="av-hero-shade" />
        <div className="av-hero-vignette" />

        {/* HUD telemetry frame */}
        <div className="av-hud" aria-hidden="true">
          <div className="av-hud-row">
            <span className="av-rec">
              <i /> REC
            </span>
            <span className="av-hud-hide-sm">14.62°N · 90.51°O — Guatemala</span>
            <span>4K / 6K CINE</span>
          </div>
        </div>

        <div className="av-hero-inner">
          <Reveal>
            <h1 className="av-hero-title">
              Tomas aéreas que{" "}
              <span className="av-serif av-grad-text">venden la escena.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="av-hero-sub">
              Bienes raíces, eventos, turismo y videos de marca — capturados desde el cielo y
              con colorización de cine para detener el scroll. Reserva por WhatsApp en minutos.
            </p>
          </Reveal>
          <Reveal delay={270}>
            <div className="av-hero-ctas">
              <a href="#contact" className="av-cta">
                Cotizar <span className="av-mono">→</span>
              </a>
              <a href="#work" className="av-ghost">
                Ver el trabajo
              </a>
            </div>
          </Reveal>
        </div>

        <div className="av-cue-wrap" aria-hidden="true">
          <span>DESLIZA</span>
          <span className="av-cue" />
        </div>

        {/* Marquee ribbon */}
        <div className="av-marquee" aria-hidden="true">
          <div className="av-marquee-track">
            {[0, 1].map((rep) => (
              <span key={rep}>
                {marqueeItems.map((item) => (
                  <span key={item}>
                    {item} <b>✦</b>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLIENTS / TRUST ============ */}
      <section className="av-band">
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "60px var(--av-pad-x)" }}>
          <div
            className="av-mono"
            style={{
              textAlign: "center",
              fontSize: 11,
              letterSpacing: ".26em",
              textTransform: "uppercase",
              color: "var(--av-muted)",
              marginBottom: 34,
            }}
          >
            Con la confianza de equipos en Guatemala
          </div>
          <div className="av-clients">
            <div className="av-logochip">
              <img src={actonLogo} alt="Acton Academy Guatemala" style={{ height: 66 }} />
            </div>
            <div className="av-logochip">
              <img
                src={prometheusLogo}
                alt="PrometheusFest del CEES"
                style={{ height: 56, borderRadius: 7 }}
              />
            </div>
            <div className="av-logochip">
              <img src={ufmLogo} alt="Universidad Francisco Marroquín" style={{ height: 58 }} />
            </div>
          </div>
          <div className="av-stats">
            {[
              { v: "50+", l: "Proyectos entregados" },
              { v: "4K · 6K", l: "Captura cinematográfica" },
              { v: "24–72h", l: "Entrega típica" },
              { v: "20+", l: "Clientes satisfechos" },
            ].map((s) => (
              <div key={s.l} className="av-stat">
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section id="work" className="av-section">
        <Reveal
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 18,
            marginBottom: 48,
          }}
        >
          <div>
            <div className="av-eyebrow">Trabajo seleccionado</div>
            <h2 className="av-h2">
              Tomado desde el cielo,
              <br />
              <span className="av-serif av-grad-text">editado para impactar.</span>
            </h2>
          </div>
          <p className="av-lead" style={{ margin: 0, maxWidth: "34ch", fontSize: 15 }}>
            Una muestra del trabajo real de AeroVision. Cada toma es capturada, estabilizada y
            con colorización propia.
          </p>
        </Reveal>

        <div className="av-workgrid">
          {/* Casas feature (full width) */}
          {workCategories
            .filter((cat) => cat.feature)
            .map((cat) => (
              <Reveal key={cat.slug} className="av-span-all">
                <WorkTile cat={cat} />
              </Reveal>
            ))}

          {/* Jump highlight, full width, right below Casas */}
          <Reveal className="av-span-all">
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
      <section id="services" className="av-band">
        <div className="av-section">
          <Reveal style={{ marginBottom: 52 }}>
            <div className="av-eyebrow">Servicios y paquetes</div>
            <h2 className="av-h2" style={{ maxWidth: "20ch" }}>
              Elige un servicio. Mira el precio.{" "}
              <span className="av-serif av-grad-text">Escríbenos.</span>
            </h2>
            <p className="av-lead" style={{ margin: "20px 0 0", maxWidth: "52ch" }}>
              Precios transparentes por niveles con extras opcionales. Arma tu paquete y llega a
              nuestro WhatsApp listo para reservar.
            </p>
          </Reveal>

          <div className="av-svcgrid">
            {services.map((svc) => (
              <Reveal key={svc.id} className="av-card">
                <div className="av-card-tag">{svc.tag}</div>
                <h3 className="av-card-title">{svc.title}</h3>
                <p className="av-card-blurb">{svc.blurb}</p>
                <ul className="av-list">
                  {svc.highlights.map((hl) => (
                    <li key={hl}>{hl}</li>
                  ))}
                </ul>
                <div className="av-card-foot">
                  <div>
                    <div className="av-price-label">Desde</div>
                    <div className="av-price">${svc.from}</div>
                  </div>
                  <button onClick={() => setOpenId(svc.id)} className="av-viewpkg">
                    Ver paquetes →
                  </button>
                </div>
              </Reveal>
            ))}

            {/* Custom quote card */}
            <Reveal className="av-card av-card--custom">
              <div className="av-card-tag">A medida</div>
              <h3 className="av-card-title">¿Tienes algo más en mente?</h3>
              <p className="av-card-blurb">
                Grabaciones de varios días, servicios combinados, una campaña o un proyecto que
                no encaja en un paquete — cuéntanos qué necesitas y armamos una cotización a tu
                medida.
              </p>
              <ul className="av-list">
                {[
                  "Alcance y precio a medida",
                  "Combina cualquier servicio",
                  "Respondemos en pocas horas",
                ].map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <div className="av-card-foot">
                <div>
                  <div className="av-price-label">Precio</div>
                  <div className="av-price" style={{ fontSize: 21 }}>
                    Cotización a medida
                  </div>
                </div>
                <a
                  href={customWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="av-cta av-cta--sm"
                >
                  Cotizar →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="av-section">
        <Reveal style={{ marginBottom: 52 }}>
          <div className="av-eyebrow">Cómo funciona una grabación</div>
          <h2 className="av-h2">
            Del mensaje <span className="av-serif av-grad-text">al corte final.</span>
          </h2>
        </Reveal>
        <div className="av-steps">
          {steps.map((step) => (
            <Reveal key={step.n} className="av-step">
              <span className="av-step-ghost">{step.n}</span>
              <div className="av-step-n">{step.n}</div>
              <div className="av-step-title">{step.title}</div>
              <div className="av-step-desc">{step.desc}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="av-band">
        <div className="av-section">
          <Reveal
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 18,
              marginBottom: 48,
            }}
          >
            <div>
              <div className="av-eyebrow">Lo que dicen los clientes</div>
              <h2 className="av-h2">
                Trabajo que consigue
                <br />
                <span className="av-serif av-grad-text">el siguiente proyecto.</span>
              </h2>
            </div>
          </Reveal>

          <div className="av-quotes">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80} className="av-quote">
                <div className="av-stars" aria-label="5 estrellas">
                  ★★★★★
                </div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className="av-quote-who">
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="av-section">
        <div className="av-contact">
          <Reveal>
            <div className="av-eyebrow">Reserva tu grabación</div>
            <h2 className="av-h2">
              Agendemos <span className="av-serif av-grad-text">tu grabación.</span>
            </h2>
            <p className="av-lead" style={{ margin: "22px 0 32px", maxWidth: "44ch" }}>
              Cuéntanos qué necesitas y más o menos cuándo. Normalmente respondemos en pocas
              horas y podemos grabar en días.
            </p>
            <div className="av-contact-links">
              <a
                href={waDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="av-biglink av-biglink--wa"
              >
                Escríbenos por WhatsApp <span className="av-mono">→</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="av-biglink av-biglink--soft"
              >
                Ver más en Instagram <span className="av-mono">↗</span>
              </a>
            </div>
            <div
              className="av-mono"
              style={{ marginTop: 30, fontSize: 12, letterSpacing: ".06em", color: "var(--av-muted)" }}
            >
              Respuesta típica: menos de 3 horas · Lun–Dom
            </div>
          </Reveal>

          <Reveal delay={120} className="av-form">
            <div className="av-form-title">Cotización rápida</div>
            <label className="av-label" htmlFor="av-name">
              Tu nombre
            </label>
            <input
              id="av-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Juan Pérez"
              className="av-input"
            />
            <label className="av-label" htmlFor="av-service">
              ¿Qué necesitas?
            </label>
            <select
              id="av-service"
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              className="av-input"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <label className="av-label" htmlFor="av-message">
              Detalles y fecha aproximada
            </label>
            <textarea
              id="av-message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="ej. Video aéreo para una casa en venta en Antigua, el próximo fin de semana."
              rows={4}
              className="av-input"
            />
            <a
              href={formWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="av-cta"
              style={{ display: "flex", width: "100%" }}
            >
              Enviar por WhatsApp
            </a>
            <div className="av-form-note">Abre WhatsApp con tu mensaje listo.</div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="av-faq" style={{ maxWidth: 1040, margin: "0 auto", padding: "clamp(70px, 11vh, 130px) var(--av-pad-x)" }}>
        <Reveal style={{ marginBottom: 44 }}>
          <div className="av-eyebrow">Preguntas</div>
          <h2 className="av-h2" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Bueno <span className="av-serif av-grad-text">saberlo.</span>
          </h2>
        </Reveal>
        <Reveal style={{ borderTop: "1px solid var(--av-line)" }}>
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                {faq.q}
                <span className="av-plus">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </Reveal>
        <Reveal className="av-askband">
          <div style={{ flex: 1, minWidth: 220 }}>
            <div
              style={{
                fontFamily: "var(--av-font-display)",
                fontWeight: 600,
                fontSize: 19,
              }}
            >
              ¿Aún tienes una pregunta?
            </div>
            <div style={{ fontSize: 14.5, color: "var(--av-text2)", marginTop: 5 }}>
              Pregúntanos directamente — normalmente respondemos en pocas horas.
            </div>
          </div>
          <a
            href={waDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="av-cta av-cta--sm"
            style={{ whiteSpace: "nowrap" }}
          >
            Pregunta por WhatsApp →
          </a>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="av-footer">
        <div className="av-foot-word" aria-hidden="true">
          AEROVISION
        </div>
        <div className="av-foot-row">
          <a href="#top" className="av-wordmark" style={{ fontSize: 17 }}>
            AERO<em>VISION</em>
          </a>
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
            <a href="/terms-of-service" className="av-navlink">
              Términos
            </a>
            <a href="#top" className="av-navlink">
              Volver arriba ↑
            </a>
          </div>
          <div className="av-foot-copy" style={{ width: "100%" }}>
            © 2026 AeroVision — Estudio de cine aéreo y drones · aerovision.gt
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
