import { useMemo } from "react";
import "@/styles/site.css";
import "@/styles/paycoach.css";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/site/SiteNav";
import AnimatedWaveFooter from "@/components/ui/animated-wave-footer";
import {
  PAYCOACH_APPSTORE,
  PAYCOACH_SITE,
  paycoachCopy,
} from "@/content/paycoach";
import { formatUpdateDate, paycoachUpdates } from "@/content/paycoach-updates";
import { useLang } from "@/i18n/LanguageProvider";
import { SITE_URL, usePageSeo } from "@/lib/seo";

const AppleMark = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

/** Arte abstracto para cada bloque de funciones (sin depender de capturas). */
const featureArt = [
  <div className="pc-bars" key="bars">
    {[38, 62, 47, 84, 55, 72].map((h, i) => (
      <i key={i} style={{ height: `${h}%` }} />
    ))}
  </div>,
  <div className="pc-ring" key="ring" />,
  <div className="pc-line" key="line">
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true">
      <path
        d="M8 132 C 60 128, 84 96, 122 92 S 196 108, 232 64 S 296 26, 312 20"
        stroke="url(#pcGrad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="312" cy="20" r="7" fill="#e9480d" />
      <defs>
        <linearGradient id="pcGrad" x1="0" y1="160" x2="320" y2="0">
          <stop stopColor="#242424" />
          <stop offset="1" stopColor="#e9480d" />
        </linearGradient>
      </defs>
    </svg>
  </div>,
];

const PayCoach = () => {
  const { t, lang } = useLang();

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PayCoach",
      applicationCategory: "EducationalApplication",
      operatingSystem: "iOS, Web",
      url: PAYCOACH_SITE,
      downloadUrl: PAYCOACH_APPSTORE,
      author: { "@type": "Organization", name: "AeroVision", url: SITE_URL },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    }),
    []
  );

  usePageSeo({
    title: t(paycoachCopy.seo.title),
    description: t(paycoachCopy.seo.description),
    path: "/products/paycoach",
    jsonLd,
  });

  const pillars = t(paycoachCopy.pillars);
  const features = t(paycoachCopy.features.items);

  return (
    <div className="pc-root">
      <SiteNav />

      <main id="main">
        {/* ---------------------------------------------- HERO */}
        <section className="pc-hero">
          <div className="pc-hero__inner">
            <div>
              <Reveal>
                <p className="sv-eyebrow">{t(paycoachCopy.hero.eyebrow)}</p>
              </Reveal>
              <Reveal delay={70}>
                <h1 className="sv-h1">
                  {t(paycoachCopy.hero.titleA)}
                  <br />
                  <span className="sv-serif sv-grad-text">{t(paycoachCopy.hero.titleB)}</span>
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="pc-hero__lead">{t(paycoachCopy.hero.lead)}</p>
              </Reveal>
              <Reveal delay={210}>
                <div>
                  <div className="pc-actions">
                    <a
                      className="pc-store"
                      href={PAYCOACH_APPSTORE}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AppleMark />
                      <span>
                        <small>{lang === "en" ? "Download on the" : "Descargar en el"}</small>
                        <b>App Store</b>
                      </span>
                    </a>
                    <a
                      className="sv-ghost"
                      href={PAYCOACH_SITE}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(paycoachCopy.hero.site)}
                    </a>
                  </div>
                  <p className="pc-note">{t(paycoachCopy.hero.note)}</p>
                </div>
              </Reveal>
            </div>

            {/* Maqueta de la app dibujada en CSS (reemplazable por capturas) */}
            <Reveal className="pc-phonewrap" delay={160}>
              <div className="pc-phone" aria-hidden="true">
                <div className="pc-screen">
                  <span className="pc-screen__notch" />
                  <p className="pc-screen__hello">
                    {lang === "en" ? "Tuesday · 4:00 PM" : "Martes · 4:00 PM"}
                  </p>

                  <div className="pc-balance">
                    <small>{lang === "en" ? "Billed this month" : "Cobrado este mes"}</small>
                    <strong>Q 8,450</strong>
                    <span>
                      {lang === "en" ? "18 of 24 students paid" : "18 de 24 alumnos al día"}
                    </span>
                  </div>

                  <p className="pc-screen__hello">
                    {lang === "en" ? "Today's class" : "Clase de hoy"}
                  </p>

                  <div className="pc-rows">
                    <div className="pc-row">
                      <i>✓</i>
                      <b>Ana R.</b>
                      <span>Q 250</span>
                    </div>
                    <div className="pc-row">
                      <i>✓</i>
                      <b>Diego M.</b>
                      <span>Q 300</span>
                    </div>
                    <div className="pc-row pc-row--out">
                      <i>—</i>
                      <b>Sofía L.</b>
                      <span>{lang === "en" ? "Absent" : "Ausente"}</span>
                    </div>
                  </div>

                  <div className="pc-goal">
                    <small>
                      {lang === "en" ? "Attendance this month" : "Asistencia del mes"}
                    </small>
                    <div className="pc-bar">
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------- PILARES */}
        <div className="pc-pillars">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 90}>
              <div className="pc-pillar">
                <div className="pc-pillar__dot" />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ------------------------------------------ FUNCIONES */}
        <section className="pc-features">
          <div className="sv-section">
            <div className="sv-head">
              <Reveal>
                <div>
                  <p className="sv-eyebrow">{t(paycoachCopy.features.eyebrow)}</p>
                  <h2 className="sv-h2">{t(paycoachCopy.features.title)}</h2>
                </div>
              </Reveal>
            </div>

            {features.map((feature, i) => (
              <div className="pc-feature" key={feature.title}>
                <Reveal>
                  <div>
                    <span className="pc-feature__tag">{feature.tag}</span>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                </Reveal>
                <Reveal className="pc-feature__art" delay={110}>
                  {featureArt[i % featureArt.length]}
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------ NOVEDADES */}
        <section className="sv-section pc-updates" id="updates">
          <div className="sv-head">
            <Reveal>
              <div>
                <p className="sv-eyebrow">{t(paycoachCopy.updates.eyebrow)}</p>
                <h2 className="sv-h2">{t(paycoachCopy.updates.title)}</h2>
                <p className="sv-lead">{t(paycoachCopy.updates.lead)}</p>
              </div>
            </Reveal>
          </div>

          <div className="pc-updates__list">
            {paycoachUpdates.map((update, i) => (
              <Reveal key={`${update.date}-${update.version ?? i}`} delay={i * 80}>
                <article className="pc-update">
                  <div className="pc-update__meta">
                    <span className="pc-update__tag">{t(update.tag)}</span>
                    <time className="pc-update__date" dateTime={update.date}>
                      {formatUpdateDate(update.date, lang)}
                    </time>
                    {update.version && (
                      <span className="pc-update__version">v{update.version}</span>
                    )}
                  </div>
                  <div>
                    <h3>{t(update.title)}</h3>
                    <p>{t(update.body)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ CTA */}
        <section className="sv-section pc-cta">
          <Reveal>
            <div>
              <h2 className="sv-h2">{t(paycoachCopy.cta.title)}</h2>
              <p>{t(paycoachCopy.cta.lead)}</p>
              <div className="pc-actions" style={{ justifyContent: "center" }}>
                <a
                  className="pc-store"
                  href={PAYCOACH_APPSTORE}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AppleMark />
                  <span>
                    <small>{lang === "en" ? "Download on the" : "Descargar en el"}</small>
                    <b>App Store</b>
                  </span>
                </a>
                <a className="sv-ghost" href={PAYCOACH_SITE} target="_blank" rel="noreferrer">
                  paycoach.app
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <AnimatedWaveFooter />
    </div>
  );
};

export default PayCoach;
