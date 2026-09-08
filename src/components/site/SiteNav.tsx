import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "@/components/site/LanguageToggle";
import { siteCopy } from "@/content/site";
import { useLang } from "@/i18n/LanguageProvider";
import { waDirect } from "@/lib/whatsapp";

interface SiteNavProps {
  /** Variante clara: la usa la página de PayCoach. */
  theme?: "dark" | "light";
}

const links = [
  { to: "/", label: siteCopy.nav.home },
  { to: "/products", label: siteCopy.nav.products },
  { to: "/portfolio", label: siteCopy.nav.portfolio },
  { to: "/drones", label: siteCopy.nav.drones },
];

/**
 * Barra superior del sitio corporativo. No se usa en /drones ni en /work/:slug,
 * que conservan su propio nav original.
 */
const SiteNav = ({ theme = "dark" }: SiteNavProps) => {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al cambiar de ruta y bloquea el scroll mientras está abierto.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <>
      <a className="sv-skip" href="#main">
        {t(siteCopy.nav.skip)}
      </a>

      <header
        className={[
          "sv-nav",
          scrolled ? "sv-nav--solid" : "",
          theme === "light" ? "sv-nav--light" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Link to="/" className="sv-wordmark">
          AERO<em>VISION</em>
        </Link>

        <nav className="sv-navlinks" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="sv-navlink"
              aria-current={isActive(link.to) ? "page" : undefined}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="sv-navright">
          <LanguageToggle />
          <a className="sv-cta sv-cta--sm" href={waDirect} target="_blank" rel="noreferrer">
            {t(siteCopy.nav.contact)}
          </a>
          <button
            type="button"
            className="sv-burger"
            aria-label={t(siteCopy.nav.menu)}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className="sv-menu" role="dialog" aria-modal="true" aria-label={t(siteCopy.nav.menu)}>
          <div className="sv-menu__top">
            <Link to="/" className="sv-wordmark">
              AERO<em>VISION</em>
            </Link>
            <button
              type="button"
              className="sv-menu__close"
              aria-label={t(siteCopy.nav.close)}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="sv-menu__links" aria-label="Principal">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="sv-menu__foot">
            <LanguageToggle />
            <a className="sv-cta sv-cta--sm" href={waDirect} target="_blank" rel="noreferrer">
              {t(siteCopy.nav.contact)}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteNav;
