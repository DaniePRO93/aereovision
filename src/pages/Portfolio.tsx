import { useMemo, useState } from "react";
import "@/styles/site.css";
import "@/styles/portfolio.css";
import Reveal from "@/components/Reveal";
import DeviceCard from "@/components/site/DeviceCard";
import SiteFooter from "@/components/site/SiteFooter";
import SiteNav from "@/components/site/SiteNav";
import { portfolioCopy } from "@/content/portfolio";
import { siteCopy } from "@/content/site";
import { portfolio, portfolioFilters, type PortfolioKind } from "@/data/portfolio";
import { useLang } from "@/i18n/LanguageProvider";
import { usePageSeo } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

const portfolioWa = waLink(
  "¡Hola AeroVision! Vi su portafolio y me gustaría trabajar en un proyecto con ustedes."
);

const Portfolio = () => {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | PortfolioKind>("all");

  usePageSeo({
    title: t(portfolioCopy.seo.title),
    description: t(portfolioCopy.seo.description),
    path: "/portfolio",
  });

  const items = useMemo(
    () => (filter === "all" ? portfolio : portfolio.filter((item) => item.kind === filter)),
    [filter]
  );

  return (
    <div className="pf-root">
      <SiteNav />

      <main id="main">
        <section className="pf-hero">
          <div className="pf-hero__inner">
            <Reveal>
              <p className="sv-eyebrow">
                {t(portfolioCopy.hero.eyebrow)} · {portfolio.length}{" "}
                {t(portfolioCopy.hero.count)}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="sv-h1">
                {t(portfolioCopy.hero.titleA)}{" "}
                <span className="sv-serif">{t(portfolioCopy.hero.titleB)}</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="sv-lead">{t(portfolioCopy.hero.lead)}</p>
            </Reveal>
          </div>
        </section>

        <div className="pf-filters">
          {portfolioFilters.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="pf-chip"
              aria-pressed={filter === chip.id}
              onClick={() => setFilter(chip.id)}
            >
              {t(chip.label)}
            </button>
          ))}
        </div>

        <div className="pf-grid">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <DeviceCard
                name={item.name}
                kind={t(item.role)}
                action={t(siteCopy.cta.viewProject)}
                caption={t(item.blurb)}
                domain={item.domain}
                href={item.href}
                internal={item.internal}
                accent={item.accent}
                accent2={item.accent2}
                badge={item.badge}
                image={item.image}
              />
            </Reveal>
          ))}
        </div>

        <section className="sv-section pf-cta">
          <Reveal>
            <div>
              <h2 className="sv-h2">{t(portfolioCopy.cta.title)}</h2>
              <p className="sv-lead">{t(portfolioCopy.cta.lead)}</p>
              <a className="sv-cta" href={portfolioWa} target="_blank" rel="noreferrer">
                {t(portfolioCopy.cta.button)}
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Portfolio;
