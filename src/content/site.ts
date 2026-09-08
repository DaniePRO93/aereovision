import type { Bilingual } from "@/i18n/LanguageProvider";

/** Copy compartido por el nav y el footer del sitio corporativo. */
export const siteCopy = {
  nav: {
    home: { es: "Inicio", en: "Home" },
    products: { es: "Productos", en: "Products" },
    portfolio: { es: "Portafolio", en: "Portfolio" },
    drones: { es: "Drones", en: "Drones" },
    contact: { es: "Contacto", en: "Contact" },
    menu: { es: "Menú", en: "Menu" },
    close: { es: "Cerrar", en: "Close" },
    skip: { es: "Saltar al contenido", en: "Skip to content" },
  },
  footer: {
    blurb: {
      es: "AeroVision es un estudio guatemalteco que construye y opera sus propios productos: software, cine aéreo y fabricación digital.",
      en: "AeroVision is a Guatemalan studio that builds and runs its own products: software, aerial cinema and digital fabrication.",
    },
    products: { es: "Productos", en: "Products" },
    company: { es: "Compañía", en: "Company" },
    home: { es: "Inicio", en: "Home" },
    portfolio: { es: "Portafolio", en: "Portfolio" },
    terms: { es: "Términos de servicio", en: "Terms of service" },
    rights: { es: "Guatemala · Hecho en casa", en: "Guatemala · Built in-house" },
  },
  cta: {
    viewProject: { es: "Ver proyecto", en: "View project" },
    viewProduct: { es: "Ver producto", en: "View product" },
    visitSite: { es: "Visitar sitio", en: "Visit site" },
    talk: { es: "Hablemos", en: "Let's talk" },
  },
} satisfies Record<string, Record<string, Bilingual<string>>>;
