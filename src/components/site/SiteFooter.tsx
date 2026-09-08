import { Link } from "react-router-dom";
import { siteCopy } from "@/content/site";
import { products } from "@/data/products";
import { useLang } from "@/i18n/LanguageProvider";
import { INSTAGRAM_URL, waDirect } from "@/lib/whatsapp";

const year = new Date().getFullYear();

/** Footer del sitio corporativo (no se usa en /drones). */
const SiteFooter = () => {
  const { t } = useLang();

  return (
    <footer className="sv-footer">
      <div className="sv-footer__grid">
        <div className="sv-footcol sv-footer__brand">
          <Link to="/" className="sv-wordmark">
            AERO<em>VISION</em>
          </Link>
          <p className="sv-footer__blurb">{t(siteCopy.footer.blurb)}</p>
          <a className="sv-ghost sv-ghost--sm" href={waDirect} target="_blank" rel="noreferrer">
            {t(siteCopy.cta.talk)}
          </a>
        </div>

        <div className="sv-footcol">
          <h4>{t(siteCopy.footer.products)}</h4>
          {products.map((product) => {
            // Si el producto tiene página propia, el footer lleva ahí.
            const internalHref = product.pageHref ?? (product.internal ? product.href : null);

            return internalHref ? (
              <Link key={product.id} to={internalHref}>
                {product.name}
              </Link>
            ) : (
              <a key={product.id} href={product.href} target="_blank" rel="noreferrer">
                {product.name}
              </a>
            );
          })}
        </div>

        <div className="sv-footcol">
          <h4>{t(siteCopy.footer.company)}</h4>
          <Link to="/">{t(siteCopy.footer.home)}</Link>
          <Link to="/portfolio">{t(siteCopy.footer.portfolio)}</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={waDirect} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="sv-footer__bottom">
        <span>© {year} AeroVision</span>
        <span>{t(siteCopy.footer.rights)}</span>
        <Link to="/terms-of-service">{t(siteCopy.footer.terms)}</Link>
      </div>
    </footer>
  );
};

export default SiteFooter;
