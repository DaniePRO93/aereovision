import { Link } from "react-router-dom";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteCopy } from "@/content/site";
import { products } from "@/data/products";
import { useLang } from "@/i18n/LanguageProvider";
import { INSTAGRAM_URL, waDirect } from "@/lib/whatsapp";

const year = new Date().getFullYear();

// Un periodo de la ola mide 1800 de ancho; se dibujan dos seguidos para que el
// desplazamiento de -50% en `animate-wave` cierre el bucle sin salto.
const wave = (a: number, b: number) =>
  [0, 1800]
    .map(
      (x) =>
        `C${x + 200} ${a} ${x + 400} ${b} ${x + 600} ${b + 50}C${x + 800} ${b + 100} ${x + 1000} 350 ${
          x + 1200
        } 300C${x + 1400} 250 ${x + 1600} ${a} ${x + 1800} 250`
    )
    .join("");
const WAVE_BACK = `M0 250${wave(150, 50)}V500H0Z`;
const WAVE_FRONT = `M0 250${wave(200, 100)}V500H0Z`;

const colTitle =
  "mb-5 text-[10.5px] uppercase tracking-[0.24em] text-[#242424]/60 [font-family:var(--sv-font-mono)]";
const colLink =
  "block py-1.5 text-[14.5px] text-[#242424]/80 no-underline transition-colors hover:text-[#e9480d]";

/**
 * Footer con ola animada (21st.dev), adaptado a la paleta del home:
 * blanco, naranja #e9480d, líneas #d1d1d1 y tinta #242424.
 */
export default function AnimatedWaveFooter() {
  const { t } = useLang();

  return (
    <footer className="relative overflow-hidden border-t border-[#d1d1d1] bg-gradient-to-b from-white to-[#e9480d]/[0.06] pt-20 text-[#242424]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 h-[500px] w-[3600px] animate-wave motion-reduce:animate-none">
          <svg
            className="h-full w-full"
            viewBox="0 0 3600 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={WAVE_BACK} fill="#e9480d" fillOpacity={0.05} />
            <path d={WAVE_FRONT} fill="#e9480d" fillOpacity={0.08} />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1340px] px-[var(--sv-pad-x)]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="sv-wordmark">
              AERO<em>VISION</em>
            </Link>
            <p className="mb-6 mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-[#242424]/75">
              {t(siteCopy.footer.blurb)}
            </p>
            <Button
              asChild
              className="h-auto rounded-full bg-[#e9480d] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#e9480d]/90 [font-family:var(--sv-font-display)]"
            >
              <a href={waDirect} target="_blank" rel="noreferrer">
                {t(siteCopy.cta.talk)}
              </a>
            </Button>
          </div>

          <nav aria-label={t(siteCopy.footer.products)}>
            <h3 className={colTitle}>{t(siteCopy.footer.products)}</h3>
            {products.map((product) => {
              const internalHref = product.pageHref ?? (product.internal ? product.href : null);
              return internalHref ? (
                <Link key={product.id} to={internalHref} className={colLink}>
                  {product.name}
                </Link>
              ) : (
                <a
                  key={product.id}
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className={colLink}
                >
                  {product.name}
                </a>
              );
            })}
          </nav>

          <nav aria-label={t(siteCopy.footer.company)}>
            <h3 className={colTitle}>{t(siteCopy.footer.company)}</h3>
            <Link to="/" className={colLink}>
              {t(siteCopy.footer.home)}
            </Link>
            <Link to="/products" className={colLink}>
              {t(siteCopy.nav.products)}
            </Link>
            <Link to="/portfolio" className={colLink}>
              {t(siteCopy.footer.portfolio)}
            </Link>
            <Link to="/drones" className={colLink}>
              {t(siteCopy.nav.drones)}
            </Link>
          </nav>

          <div>
            <h3 className={colTitle}>{t(siteCopy.footer.contact)}</h3>
            <address className="space-y-2 text-[14.5px] not-italic text-[#242424]/80">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#e9480d]" aria-hidden="true" />
                Guatemala
              </p>
              <a href={waDirect} target="_blank" rel="noreferrer" className={colLink}>
                WhatsApp
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={colLink}>
                @aerovision.gt
              </a>
            </address>
            <div className="mt-5 flex gap-3">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full border border-[#d1d1d1] text-[#242424] hover:border-[#e9480d] hover:bg-[#e9480d] hover:text-white"
              >
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full border border-[#d1d1d1] text-[#242424] hover:border-[#e9480d] hover:bg-[#e9480d] hover:text-white"
              >
                <a href={waDirect} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[#d1d1d1] py-8 text-[10.5px] uppercase tracking-[0.16em] text-[#242424]/60 [font-family:var(--sv-font-mono)]">
          <span>© {year} AeroVision</span>
          <span>{t(siteCopy.footer.rights)}</span>
          <Link to="/terms-of-service" className="text-inherit no-underline hover:text-[#e9480d]">
            {t(siteCopy.footer.terms)}
          </Link>
        </div>
      </div>
    </footer>
  );
}
