import type { CSSProperties } from "react";
import "@/styles/site.css";
import "@/styles/portfolio.css";
import "@/styles/games.css";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/site/SiteNav";
import AnimatedWaveFooter from "@/components/ui/animated-wave-footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { gamesCopy } from "@/content/games";
import { gameUrl, games } from "@/data/games";
import { useLang } from "@/i18n/LanguageProvider";
import { usePageSeo } from "@/lib/seo";

const Games = () => {
  const { t } = useLang();

  usePageSeo({
    title: t(gamesCopy.seo.title),
    description: t(gamesCopy.seo.description),
    path: "/games",
  });

  return (
    <div className="pf-root">
      <SiteNav />

      <main id="main">
        <section className="pf-hero">
          <BackgroundPaths className="st-paths" />
          <div className="pf-hero__inner">
            <Reveal>
              <p className="sv-eyebrow">
                {t(gamesCopy.hero.eyebrow)} · {games.length} {t(gamesCopy.hero.count)}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="sv-h1">
                {t(gamesCopy.hero.titleA)}{" "}
                <span className="sv-serif">{t(gamesCopy.hero.titleB)}</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="sv-lead">{t(gamesCopy.hero.lead)}</p>
            </Reveal>
          </div>
        </section>

        <div className="gm-grid">
          {games.map((game, i) => (
            <Reveal key={game.slug} delay={(i % 3) * 70}>
              <a
                className={i === 0 ? "gm-card gm-card--feature" : "gm-card"}
                href={gameUrl(game)}
                target="_blank"
                rel={game.externalUrl ? "noopener noreferrer" : "noopener"}
                style={{ "--gm-accent": game.accent } as CSSProperties}
              >
                <div className="gm-card__frame">
                  <img
                    src={game.cover}
                    alt=""
                    loading={i > 2 ? "lazy" : "eager"}
                    width={960}
                    height={600}
                  />
                  <span className="gm-card__play">
                    {t(gamesCopy.play)} <span aria-hidden="true">↗</span>
                  </span>
                </div>
                <div className="gm-card__body">
                  <p className="gm-card__genre">{t(game.genre)}</p>
                  <h2 className="gm-card__name">{game.name}</h2>
                  <p className="gm-card__blurb">{t(game.blurb)}</p>
                  {(game.desktopOnly || game.externalUrl) && (
                    <ul className="gm-card__tags">
                      {game.desktopOnly && <li>{t(gamesCopy.desktopOnly)}</li>}
                      {game.externalUrl && <li>{t(gamesCopy.external)}</li>}
                    </ul>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </main>

      <AnimatedWaveFooter />
    </div>
  );
};

export default Games;
