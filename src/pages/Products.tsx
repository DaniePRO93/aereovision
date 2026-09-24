import { Link } from "react-router-dom";
import "@/styles/site.css";
import "@/styles/products.css";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/site/SiteNav";
import AnimatedWaveFooter from "@/components/ui/animated-wave-footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { productsCopy } from "@/content/products";
import { siteCopy } from "@/content/site";
import { products } from "@/data/products";
import { useLang } from "@/i18n/LanguageProvider";
import { usePageSeo } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

const productsWa = waLink(
  "¡Hola AeroVision! Vi sus productos y quisiera platicar sobre uno de ellos."
);

const Products = () => {
  const { t } = useLang();

  usePageSeo({
    title: t(productsCopy.seo.title),
    description: t(productsCopy.seo.description),
    path: "/products",
  });

  return (
    <div className="pr-root">
      <SiteNav />

      <main id="main">
        <section className="pr-hero">
          <BackgroundPaths className="st-paths" />
          <div className="pr-hero__inner">
            <Reveal>
              <p className="sv-eyebrow">{t(productsCopy.hero.eyebrow)}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="sv-h1">
                {t(productsCopy.hero.titleA)}{" "}
                <span className="sv-serif sv-grad-text">{t(productsCopy.hero.titleB)}</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="sv-lead">{t(productsCopy.hero.lead)}</p>
            </Reveal>
          </div>
        </section>

        {products.map((product, i) => {
          const action = product.internal
            ? t(siteCopy.cta.viewProduct)
            : t(siteCopy.cta.visitSite);

          return (
            <section
              key={product.id}
              className={`pr-row ${i % 2 === 1 ? "pr-row--flip" : ""}`}
            >
              <div className="pr-row__inner">
                <Reveal>
                  <div>
                    <p className="pr-row__index">
                      {t(productsCopy.labels.index)} {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="pr-row__title">{product.name}</h2>
                    <span className="pr-row__kind">{t(product.kind)}</span>
                    <p className="pr-row__blurb">{t(product.blurb)}</p>

                    <div className="sv-tagrow">
                      {product.tags.map((tag) => (
                        <span className="sv-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pr-row__actions">
                      {product.internal ? (
                        <Link className="sv-cta" to={product.href}>
                          {action}
                        </Link>
                      ) : (
                        <a
                          className="sv-cta"
                          href={product.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {action}
                        </a>
                      )}

                      {product.pageHref && (
                        <Link className="sv-ghost" to={product.pageHref}>
                          {t(productsCopy.labels.more)}
                        </Link>
                      )}

                      {product.secondary && (
                        <a
                          className="sv-ghost"
                          href={product.secondary.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t(product.secondary.label)}
                        </a>
                      )}
                    </div>

                    <p className="pr-row__domain">{product.domain}</p>
                  </div>
                </Reveal>

                <Reveal className="pr-row__media" delay={120}>
                  <div className="pr-frame">
                    {product.image && (
                      <img
                        className="pr-frame__shot"
                        src={product.image}
                        alt=""
                        loading="lazy"
                      />
                    )}
                    <span
                      className={`pr-frame__logo ${
                        product.logoOnDark ? "pr-frame__logo--dark" : ""
                      }`}
                      aria-hidden="true"
                    >
                      {product.logo ? (
                        <img src={product.logo} alt="" loading="lazy" />
                      ) : (
                        <b>{product.name.slice(0, 2).toUpperCase()}</b>
                      )}
                    </span>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}

        <section className="sv-section pr-cta">
          <Reveal>
            <div>
              <p className="sv-eyebrow">{t(productsCopy.cta.eyebrow)}</p>
              <h2 className="sv-h2">{t(productsCopy.cta.title)}</h2>
              <p className="sv-lead">{t(productsCopy.cta.lead)}</p>
              <a className="sv-cta" href={productsWa} target="_blank" rel="noreferrer">
                {t(productsCopy.cta.button)}
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <AnimatedWaveFooter />
    </div>
  );
};

export default Products;
