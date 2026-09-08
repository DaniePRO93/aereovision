import type { Bilingual } from "@/i18n/LanguageProvider";

export const homeCopy = {
  seo: {
    title: {
      es: "AeroVision | Estudio de producto en Guatemala — Apps, cine aéreo e impresión 3D",
      en: "AeroVision | Product studio in Guatemala — Apps, aerial cinema and 3D printing",
    },
    description: {
      es: "AeroVision es un estudio guatemalteco que construye y opera sus propios productos: PayCoach para iOS, cine aéreo con drones e impresión 3D bajo pedido.",
      en: "AeroVision is a Guatemalan studio that builds and runs its own products: PayCoach for iOS, aerial drone cinema and on-demand 3D printing.",
    },
  },
  hero: {
    eyebrow: { es: "Estudio de producto · Guatemala", en: "Product studio · Guatemala" },
    titleA: { es: "Construimos negocios,", en: "We build businesses," },
    titleB: { es: "no sólo proyectos.", en: "not just projects." },
    lead: {
      es: "AeroVision es un estudio guatemalteco donde cada idea termina siendo un producto real, publicado y en manos de gente: PayCoach en el App Store, un estudio de cine aéreo operando y un taller de impresión 3D.",
      en: "AeroVision is a Guatemalan studio where every idea ends up a real product — shipped and in people's hands: PayCoach on the App Store, a working aerial film studio, and a 3D printing workshop.",
    },
    ctaPrimary: { es: "Ver productos", en: "See products" },
    ctaSecondary: { es: "Ver portafolio", en: "See portfolio" },
    scroll: { es: "Desliza", en: "Scroll" },
  },
  marquee: {
    es: ["PayCoach", "Cine aéreo", "Impresión 3D", "Producto", "Guatemala", "Diseño", "Software"],
    en: ["PayCoach", "Aerial cinema", "3D printing", "Product", "Guatemala", "Design", "Software"],
  },
  products: {
    eyebrow: { es: "Lo que construimos", en: "What we build" },
    title: { es: "Tres negocios, una misma casa.", en: "Three businesses, one house." },
    lead: {
      es: "Cada uno tiene su propio equipo, su propio ritmo y su propia manera de verse. Lo que comparten es cómo trabajamos: prototipo rápido, detalle obsesivo y una fecha de salida real.",
      en: "Each has its own team, its own pace and its own look. What they share is how we work: fast prototypes, obsessive detail, and a real ship date.",
    },
    all: { es: "Ver todos los productos", en: "See all products" },
  },
  about: {
    eyebrow: { es: "Quiénes somos", en: "Who we are" },
    title: { es: "Un estudio pequeño que envía.", en: "A small studio that ships." },
    body: {
      es: "Empezamos volando drones sobre Guatemala y terminamos escribiendo software, diseñando marcas e imprimiendo piezas. Nos interesa la parte difícil: llevar algo desde la idea hasta que alguien lo usa y paga por él.",
      en: "We started flying drones over Guatemala and ended up writing software, designing brands and printing parts. What interests us is the hard part: taking something from idea to someone actually using and paying for it.",
    },
    stats: {
      es: [
        { value: "3", label: "Negocios activos" },
        { value: "7", label: "Productos lanzados" },
        { value: "iOS", label: "App publicada" },
        { value: "24–72h", label: "Entrega típica" },
      ],
      en: [
        { value: "3", label: "Active businesses" },
        { value: "7", label: "Products shipped" },
        { value: "iOS", label: "App on the store" },
        { value: "24–72h", label: "Typical delivery" },
      ],
    },
  },
  work: {
    eyebrow: { es: "Portafolio", en: "Portfolio" },
    title: { es: "Cosas que ya están en línea.", en: "Things already live." },
    lead: {
      es: "Apps, sitios y piezas de video que hemos diseñado y publicado. Todos se pueden abrir hoy mismo.",
      en: "Apps, sites and video work we designed and shipped. Every one of them opens today.",
    },
    cta: { es: "Ver el portafolio completo", en: "See the full portfolio" },
  },
  contact: {
    eyebrow: { es: "Contacto", en: "Contact" },
    title: { es: "¿Tienes algo en mente?", en: "Got something in mind?" },
    lead: {
      es: "Contanos qué estás construyendo. Respondemos por WhatsApp normalmente el mismo día.",
      en: "Tell us what you're building. We usually answer over WhatsApp the same day.",
    },
    cta: { es: "Escribir por WhatsApp", en: "Message on WhatsApp" },
  },
} satisfies Record<string, unknown> & { seo: Record<string, Bilingual<string>> };
