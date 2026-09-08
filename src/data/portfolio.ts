import type { Bilingual } from "@/i18n/LanguageProvider";
import aerovisionMark from "@/assets/products/aerovision-mark.png";
import paycoachLogo from "@/assets/products/paycoach-logo.png";
import straightupLogo from "@/assets/products/straightup-logo.png";
import shotBasecode from "@/assets/shots/basecode.jpg";
import shotBusinessForge from "@/assets/shots/business-forge.jpg";
import shotDarkline from "@/assets/shots/darkline.jpg";
import shotDrones from "@/assets/shots/drones.jpg";
import shotPawsome from "@/assets/shots/pawsome.jpg";
import shotPaycoach from "@/assets/shots/paycoach.jpg";
import shotStraightup from "@/assets/shots/straightup.jpg";

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
  /** Logo de la marca; si falta se dibuja el monograma. */
  logo?: string;
  /** true = el logo ya viene sobre fondo oscuro y no lleva placa clara. */
  logoOnDark?: boolean;
  /** Captura de la portada del sitio, de fondo en la tarjeta. */
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
    role: { es: "App iOS y web · Academias", en: "iOS and web app · Academies" },
    blurb: {
      es: "App publicada en el App Store para pasar asistencia sin señal, calcular el cobro de cada alumno y enviarlo por WhatsApp.",
      en: "App shipped on the App Store to take attendance offline, work out each student's bill and send it over WhatsApp.",
    },
    domain: "paycoach.app",
    href: "https://paycoach.app",
    internal: false,
    accent: "#34d399",
    accent2: "#0ea5e9",
    logo: paycoachLogo,
    image: shotPaycoach,
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
    logo: aerovisionMark,
    logoOnDark: true,
    image: shotDrones,
  },
  {
    id: "straightup",
    name: "Straight Up",
    kind: "web",
    role: { es: "Calistenia · Ciudad de Guatemala", en: "Calisthenics · Guatemala City" },
    blurb: {
      es: "Sitio para una escuela de calistenia con tres sedes: programas, entrenadores, transformaciones y reservas por WhatsApp.",
      en: "Site for a calisthenics school with three locations: programmes, coaches, transformations and WhatsApp bookings.",
    },
    domain: "straightup.pages.dev",
    href: "https://straightup.pages.dev",
    internal: false,
    accent: "#f97316",
    accent2: "#ef4444",
    logo: straightupLogo,
    logoOnDark: true,
    image: shotStraightup,
  },
  {
    id: "darkline",
    name: "Darkline",
    kind: "web",
    role: { es: "Coaching de fuerza y físico", en: "Strength and physique coaching" },
    blurb: {
      es: "Plataforma de coaching en línea de un competidor de classic physique: planes mensuales, asesoría y su línea de ropa.",
      en: "Online coaching platform for a classic physique competitor: monthly plans, guidance and his apparel line.",
    },
    domain: "darklinecoaching.pages.dev",
    href: "https://darklinecoaching.pages.dev",
    internal: false,
    accent: "#a78bfa",
    accent2: "#6366f1",
    image: shotDarkline,
  },
  {
    id: "pawsome",
    name: "Pawsome Walks",
    kind: "web",
    role: { es: "Paseos para perros · Guatemala", en: "Dog walking · Guatemala" },
    blurb: {
      es: "Servicio de paseos grupales: recogen al perro en casa, lo pasean en grupos pequeños y mandan fotos por WhatsApp.",
      en: "Group dog-walking service: they pick the dog up at home, walk it in small groups and send photos over WhatsApp.",
    },
    domain: "pawsomewalks.pages.dev",
    href: "https://pawsomewalks.pages.dev/",
    internal: false,
    accent: "#fbbf24",
    accent2: "#84cc16",
    image: shotPawsome,
  },
  {
    id: "basecode",
    name: "BaseCode",
    kind: "web",
    role: { es: "Juego para aprender a programar", en: "Learn-to-code game" },
    blurb: {
      es: "Juego narrativo que enseña programación: entrás como operativo a reparar un código raíz corrupto, misión por misión.",
      en: "A narrative game that teaches programming: you sign in as an operative to repair a corrupted root code, mission by mission.",
    },
    domain: "basecode.pages.dev",
    href: "https://basecode.pages.dev/",
    internal: false,
    accent: "#22d3ee",
    accent2: "#3b82f6",
    image: shotBasecode,
  },
  {
    id: "business-forge",
    name: "Business Forge",
    kind: "web",
    role: { es: "Asesor de negocios con IA", en: "AI business advisor" },
    blurb: {
      es: "Asistente que ayuda a aterrizar una idea de negocio y a decidir los siguientes pasos concretos.",
      en: "An assistant that helps land a business idea and decide the concrete next steps.",
    },
    domain: "business-forge.pages.dev",
    href: "https://business-forge.pages.dev/",
    internal: false,
    accent: "#f43f5e",
    accent2: "#f59e0b",
    image: shotBusinessForge,
  },
];
