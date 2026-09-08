import type { Bilingual } from "@/i18n/LanguageProvider";

export interface ProductItem {
  id: string;
  /** Nombre comercial tal cual se muestra. */
  name: string;
  /** Categoría corta (App, Estudio, Taller...). */
  kind: Bilingual<string>;
  /** Una línea: qué es. */
  tagline: Bilingual<string>;
  /** Párrafo corto para la tarjeta grande. */
  blurb: Bilingual<string>;
  /** Etiquetas de plataforma/tecnología. */
  tags: string[];
  /** Dominio que se imprime debajo de la tarjeta. */
  domain: string;
  /** Destino del botón principal. */
  href: string;
  /** true = ruta interna (react-router), false = enlace externo. */
  internal: boolean;
  /** Enlace secundario opcional (Instagram, App Store...). */
  secondary?: { label: Bilingual<string>; href: string };
  /** Color de acento de la tarjeta. */
  accent: string;
  /** Segundo color para el degradado del marco. */
  accent2: string;
  /** Emoji/insignia flotante de la tarjeta (como las banderas de la referencia). */
  badge: string;
  /** Imagen opcional; si falta se dibuja el marco con degradado. */
  image?: string;
  /** Marca el producto destacado del home. */
  featured?: boolean;
}

export const products: ProductItem[] = [
  {
    id: "paycoach",
    name: "PayCoach",
    kind: { es: "App iOS", en: "iOS App" },
    tagline: {
      es: "Tu entrenador de finanzas personales, en el bolsillo.",
      en: "Your personal finance coach, in your pocket.",
    },
    blurb: {
      es: "Una app para entender a dónde se va tu dinero y decidir mejor: registro rápido de gastos, metas claras y un coach que te acompaña mes a mes. Disponible en el App Store.",
      en: "An app to understand where your money goes and decide better: fast expense tracking, clear goals, and a coach that walks you through every month. Available on the App Store.",
    },
    tags: ["iOS", "Fintech", "Swift"],
    domain: "paycoach.app",
    href: "/products/paycoach",
    internal: true,
    secondary: {
      label: { es: "App Store", en: "App Store" },
      href: "https://apps.apple.com/gt/app/paycoach/id6799230820?l=en-GB",
    },
    accent: "#34d399",
    accent2: "#0ea5e9",
    badge: "🇬🇹",
    featured: true,
  },
  {
    id: "drones",
    name: "AeroVision Drones",
    kind: { es: "Estudio audiovisual", en: "Film studio" },
    tagline: {
      es: "Cine aéreo que hace que la escena se venda sola.",
      en: "Aerial cinema that makes the scene sell itself.",
    },
    blurb: {
      es: "Video aéreo cinematográfico, fotografía con drone y vuelos FPV para bienes raíces, eventos, turismo y marcas en Guatemala. Captura en 4K y 6K con entrega en 24–72 horas.",
      en: "Cinematic aerial video, drone photography and FPV flights for real estate, events, tourism and brands in Guatemala. 4K and 6K capture with 24–72h delivery.",
    },
    tags: ["4K · 6K", "FPV", "Guatemala"],
    domain: "aerovision.gt/drones",
    href: "/drones",
    internal: true,
    secondary: {
      label: { es: "Instagram", en: "Instagram" },
      href: "https://instagram.com/aerovision.gt",
    },
    accent: "#f2b257",
    accent2: "#e2603f",
    badge: "🇬🇹",
    featured: true,
  },
  {
    id: "3dprints",
    name: "3D Prints GT",
    kind: { es: "Taller de impresión 3D", en: "3D printing workshop" },
    tagline: {
      es: "De la idea al objeto, capa por capa.",
      en: "From idea to object, layer by layer.",
    },
    blurb: {
      es: "Impresión 3D bajo pedido en Guatemala: prototipos, piezas de repuesto, figuras y proyectos a medida. Mandas el modelo o lo diseñamos contigo.",
      en: "On-demand 3D printing in Guatemala: prototypes, replacement parts, figures and custom projects. Send the model or we design it with you.",
    },
    tags: ["FDM", "CAD", "Guatemala"],
    domain: "instagram.com/3dprints_gt",
    href: "https://www.instagram.com/3dprints_gt",
    internal: false,
    accent: "#22d3ee",
    accent2: "#6366f1",
    badge: "🇬🇹",
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const getProduct = (id: string): ProductItem | undefined =>
  products.find((p) => p.id === id);
