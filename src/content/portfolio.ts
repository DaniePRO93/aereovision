import type { Bilingual } from "@/i18n/LanguageProvider";

export const portfolioCopy = {
  seo: {
    title: {
      es: "Portafolio | AeroVision — Apps, sitios web y cine aéreo",
      en: "Portfolio | AeroVision — Apps, websites and aerial film",
    },
    description: {
      es: "Proyectos diseñados y publicados por AeroVision: PayCoach, AeroVision Drones, StraightUp, Darkline Coaching, Pawsome Walks, BaseCode y Business Forge.",
      en: "Projects designed and shipped by AeroVision: PayCoach, AeroVision Drones, StraightUp, Darkline Coaching, Pawsome Walks, BaseCode and Business Forge.",
    },
  },
  hero: {
    eyebrow: { es: "Portafolio", en: "Portfolio" },
    titleA: { es: "Trabajo", en: "Work that's" },
    titleB: { es: "que ya está en línea.", en: "already live." },
    lead: {
      es: "Nada de maquetas: cada tarjeta abre un producto real que puedes usar hoy. Apps publicadas, sitios en producción y video entregado a clientes.",
      en: "No mockups: every card opens a real product you can use today. Published apps, sites in production, and video delivered to clients.",
    },
    count: { es: "proyectos", en: "projects" },
  },
  cta: {
    title: { es: "El siguiente puede ser el tuyo.", en: "The next one could be yours." },
    lead: {
      es: "Diseñamos y construimos productos completos —marca, interfaz, código y lanzamiento— desde Guatemala.",
      en: "We design and build complete products — brand, interface, code and launch — out of Guatemala.",
    },
    button: { es: "Empezar un proyecto", en: "Start a project" },
  },
} satisfies { seo: Record<string, Bilingual<string>> } & Record<string, unknown>;
