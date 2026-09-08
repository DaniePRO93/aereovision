import { useMemo } from "react";
import { Link } from "react-router-dom";
import "@/styles/site.css";
import "@/styles/studio.css";
import Reveal from "@/components/Reveal";
import DeviceCard from "@/components/site/DeviceCard";
import SiteFooter from "@/components/site/SiteFooter";
import SiteNav from "@/components/site/SiteNav";
import { homeCopy } from "@/content/home";
import { siteCopy } from "@/content/site";
import { portfolio } from "@/data/portfolio";
import { featuredProducts } from "@/data/products";
import { useLang } from "@/i18n/LanguageProvider";
import { SITE_URL, usePageSeo } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

const contactWa = waLink(
  "¡Hola AeroVision! Vi su sitio y me gustaría platicar sobre un proyecto."
);

const Home = () => {
  const { t } = useLang();

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "AeroVision",
        url: SITE_URL,
        logo: `${SITE_URL}/aerovision-logo.png`,
        description:
          "Estudio guatemalteco de producto: software, cine aéreo con drones e impresión 3D.",
        address: { "@type": "PostalAddress", addressCountry: "GT" },
        sameAs: ["https://instagram.com/aerovision.gt", "https://paycoach.app"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "AeroVision",
        url: SITE_URL,
        inLanguage: "es-GT",
      },
    ],
    []
  );

  usePageSeo({
    title: t(homeCopy.seo.title),
    description: t(homeCopy.seo.description),
    path: "/",
    jsonLd,
  });

  const marquee = t(homeCopy.marquee);
  const stats = t(homeCopy.about.stats);

  return (
    <div className="st-root">
      <SiteNav />

      <main id="main">
        {/* ---------------------------------------------- HERO */}
        <section className="st-hero">
          <div className="st-aurora" aria-hidden="true" />
          <div className="st-grid" aria-hidden="true" />

          <div className="st-hero__inner">
            <Reveal>
              <p className="sv-eyebrow">{t(homeCopy.hero.eyebrow)}</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="sv-h1">
                {t(homeCopy.hero.titleA)}
                <br />
                <span className="sv-serif sv-grad-text">{t(homeCopy.hero.titleB)}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="sv-lead st-hero__lead">{t(homeCopy.hero.lead)}</p>
            </Reveal>

            <Reveal delay={230}>
              <div className="st-actions">
                <Link className="sv-cta" to="/products">
                  {t(homeCopy.hero.ctaPrimary)}
                </Link>
                <Link className="sv-ghost" to="/portfolio">
                  {t(homeCopy.hero.ctaSecondary)}
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="st-hero__foot">
            <span className="sv-mono">{t(homeCopy.hero.scroll)} ↓</span>
            <span className="sv-mono">14.62°N · 90.51°O</span>
          </div>

          <div className="st-marquee" aria-hidden="true">
            <div className="st-marquee__track">
              {[...marquee, ...marquee].map((item, i) => (
                <span key={`${item}-${i}`}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------ PRODUCTOS */}
        <section className="sv-section st-products">
          <div className="st-products__head">
            <Reveal>
              <div>
                <p className="sv-eyebrow">{t(homeCopy.products.eyebrow)}</p>
                <h2 className="sv-h2">{t(homeCopy.products.title)}</h2>
                <p className="sv-lead">{t(homeCopy.products.lead)}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Link className="sv-ghost sv-ghost--sm" to="/products">
                {t(homeCopy.products.all)} →
              </Link>
            </Reveal>
          </div>

          <div className="sv-cards">
            {featuredProducts.map((product, i) => (
              <Reveal key={product.id} delay={i * 110}>
                <DeviceCard
                  name={product.name}
                  kind={t(product.kind)}
                  action={
                    product.internal ? t(siteCopy.cta.viewProduct) : t(siteCopy.cta.visitSite)
                  }
                  caption={t(product.tagline)}
                  domain={product.domain}
                  href={product.href}
                  internal={product.internal}
                  accent={product.accent}
                  accent2={product.accent2}
                  logo={product.logo}
                  logoOnDark={product.logoOnDark}
                  image={product.image}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------- ABOUT */}
        <section className="sv-section st-about">
          <div className="st-about__grid">
            <Reveal>
              <div>
                <p className="sv-eyebrow">{t(homeCopy.about.eyebrow)}</p>
                <h2 className="sv-h2">{t(homeCopy.about.title)}</h2>
                <p className="st-about__body">{t(homeCopy.about.body)}</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="st-stats">
                {stats.map((stat) => (
                  <div className="st-stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------ PORTAFOLIO */}
        <section className="sv-section">
          <div className="sv-head">
            <Reveal>
              <div>
                <p className="sv-eyebrow">{t(homeCopy.work.eyebrow)}</p>
                <h2 className="sv-h2">{t(homeCopy.work.title)}</h2>
                <p className="sv-lead">{t(homeCopy.work.lead)}</p>
              </div>
            </Reveal>
          </div>

          <div className="st-worklist">
            {portfolio.map((item, i) => {
              const body = (
                <>
                  <span className="st-workrow__idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="st-workrow__name">
                    <span className="st-workrow__dot" style={{ background: item.accent }} />
                    {item.name}
                  </span>
                  <span className="st-workrow__role">{t(item.role)}</span>
                  <span className="st-workrow__arrow" aria-hidden="true">
                    →
                  </span>
                </>
              );

              return (
                <Reveal key={item.id} delay={i * 50}>
                  {item.internal ? (
                    <Link className="st-workrow" to={item.href}>
                      {body}
                    </Link>
                  ) : (
                    <a
                      className="st-workrow"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {body}
                    </a>
                  )}
                </Reveal>
              );
            })}
          </div>

          <div style={{ marginTop: 34 }}>
            <Link className="sv-ghost sv-ghost--sm" to="/portfolio">
              {t(homeCopy.work.cta)} →
            </Link>
          </div>
        </section>

        {/* -------------------------------------------- CONTACTO */}
        <section className="sv-section st-contact">
          <Reveal>
            <div>
              <p className="sv-eyebrow">{t(homeCopy.contact.eyebrow)}</p>
              <h2 className="sv-h2">{t(homeCopy.contact.title)}</h2>
              <p className="sv-lead">{t(homeCopy.contact.lead)}</p>
              <a className="sv-cta" href={contactWa} target="_blank" rel="noreferrer">
                {t(homeCopy.contact.cta)}
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Home;
