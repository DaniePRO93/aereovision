import type { Bilingual } from "@/i18n/LanguageProvider";

export type PortfolioKind = "app" | "web" | "video";

export interface PortfolioItem {
  id: string;
  name: string;
  kind: PortfolioKind;
  /** Línea superior de la ficha, bajo la tarjeta. */
  role: Bilingual<string>;
  /** Descripción corta. */
  blurb: Bilingual<string>;
  /** Dominio impreso bajo la tarjeta. */
  domain: string;
  href: string;
  internal: boolean;
  accent: string;
  accent2: string;
  badge: string;
  image?: string;
}

export const portfolioFilters: { id: "all" | PortfolioKind; label: Bilingual<string> }[] = [
  { id: "all", label: { es: "Todo", en: "All" } },
  { id: "app", label: { es: "Apps", en: "Apps" } },
  { id: "web", label: { es: "Web", en: "Web" } },
  { id: "video", label: { es: "Video", en: "Video" } },
];

export const portfolio: PortfolioItem[] = [
  {
    id: "paycoach",
    name: "PayCoach",
    kind: "app",
    role: { es: "App iOS · Finanzas personales", en: "iOS app · Personal finance" },
    blurb: {
      es: "App nativa publicada en el App Store para registrar gastos, fijar metas y entender tus finanzas mes a mes.",
      en: "Native app shipped on the App Store to track spending, set goals and understand your finances month to month.",
    },
    domain: "paycoach.app",
    href: "/products/paycoach",
    internal: true,
    accent: "#34d399",
    accent2: "#0ea5e9",
    badge: "🇬🇹",
  },
  {
    id: "drones",
    name: "AeroVision Drones",
    kind: "video",
    role: { es: "Estudio de cine aéreo · Guatemala", en: "Aerial film studio · Guatemala" },
    blurb: {
      es: "Sitio y operación completa del estudio: portafolio por categoría, paquetes y cotización directa por WhatsApp.",
      en: "The studio's full site and operation: portfolio by category, packages and instant quoting over WhatsApp.",
    },
    domain: "aerovision.gt",
    href: "/drones",
    internal: true,
    accent: "#f2b257",
    accent2: "#e2603f",
    badge: "🇬🇹",
  },
  {
    id: "straightup",
    name: "StraightUp",
    kind: "web",
    role: { es: "Producto web", en: "Web product" },
    blurb: {
      es: "Producto web enfocado en hábitos y consistencia, con una interfaz directa y sin fricción.",
      en: "A web product built around habits and consistency, with a direct, friction-free interface.",
    },
    domain: "straightup.pages.dev",
    href: "https://straightup.pages.dev",
    internal: false,
    accent: "#f97316",
    accent2: "#ef4444",
    badge: "🌐",
  },
  {
    id: "darkline",
    name: "Darkline Coaching",
    kind: "web",
    role: { es: "Coach personal", en: "Personal coach" },
    blurb: {
      es: "Plataforma de coaching personal: planes, seguimiento y una identidad visual oscura y enfocada.",
      en: "A personal coaching platform: plans, tracking, and a dark, focused visual identity.",
    },
    domain: "darklinecoaching.pages.dev",
    href: "https://darklinecoaching.pages.dev",
    internal: false,
    accent: "#a78bfa",
    accent2: "#6366f1",
    badge: "🌐",
  },
  {
    id: "pawsome",
    name: "Pawsome Walks",
    kind: "web",
    role: { es: "Paseo de perros", en: "Dog walking" },
    blurb: {
      es: "Reserva de paseos para perros: agenda, paseadores y seguimiento, con un tono cálido y amigable.",
      en: "Dog-walking bookings: scheduling, walkers and tracking, with a warm and friendly tone.",
    },
    domain: "pawsomewalks.pages.dev",
    href: "https://pawsomewalks.pages.dev/",
    internal: false,
    accent: "#fbbf24",
    accent2: "#84cc16",
    badge: "🐾",
  },
  {
    id: "basecode",
    name: "BaseCode",
    kind: "web",
    role: { es: "Juego para aprender a programar", en: "Learn-to-code game" },
    blurb: {
      es: "Juego educativo que enseña fundamentos de programación resolviendo retos, nivel por nivel.",
      en: "An educational game that teaches programming fundamentals through challenges, level by level.",
    },
    domain: "basecode.pages.dev",
    href: "https://basecode.pages.dev/",
    internal: false,
    accent: "#22d3ee",
    accent2: "#3b82f6",
    badge: "🎮",
  },
  {
    id: "business-forge",
    name: "Business Forge",
    kind: "web",
    role: { es: "Asistente de negocios", en: "Business assistant" },
    blurb: {
      es: "Asistente que ayuda a aterrizar ideas de negocio: validación, plan y siguientes pasos concretos.",
      en: "An assistant that helps land business ideas: validation, a plan, and concrete next steps.",
    },
    domain: "business-forge.pages.dev",
    href: "https://business-forge.pages.dev/",
    internal: false,
    accent: "#f43f5e",
    accent2: "#f59e0b",
    badge: "⚒️",
  },
];
