import type { Bilingual } from "@/i18n/LanguageProvider";
import aerovisionMark from "@/assets/products/aerovision-mark.png";
import printsLogo from "@/assets/products/3dprints-logo.png";
import paycoachLogo from "@/assets/products/paycoach-logo.png";
import penstrikeLogo from "@/assets/products/penstrike-logo.svg";
import shotDrones from "@/assets/shots/drones.jpg";
import shotPaycoach from "@/assets/shots/paycoach.jpg";
import shotPenstrike from "@/assets/shots/penstrike.webp";

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
  /** Destino del botón principal de la tarjeta. */
  href: string;
  /** true = ruta interna (react-router), false = enlace externo. */
  internal: boolean;
  /** Página propia dentro del sitio, si existe (nav, footer y enlace secundario). */
  pageHref?: string;
  /** Enlace secundario opcional (Instagram, App Store...). */
  secondary?: { label: Bilingual<string>; href: string };
  /** Color de acento de la tarjeta. */
  accent: string;
  /** Segundo color para el degradado del marco. */
  accent2: string;
  /** Logo de la marca; si falta se dibuja el monograma. */
  logo?: string;
  /** true = el logo ya viene sobre fondo oscuro y no lleva placa clara. */
  logoOnDark?: boolean;
  /** Imagen de fondo opcional; si falta se dibuja el marco con degradado. */
  image?: string;
  /** Marca el producto destacado del home. */
  featured?: boolean;
}

export const products: ProductItem[] = [
  {
    id: "paycoach",
    name: "PayCoach",
    kind: { es: "App para academias", en: "App for academies" },
    tagline: {
      es: "Asistencia, cobros y alumnos, sin papeles.",
      en: "Attendance, billing and students, without paperwork.",
    },
    blurb: {
      es: "La app para entrenadores que dan clase fuera del aula. Pasás asistencia desde el teléfono —aunque no haya señal—, PayCoach calcula lo que debe cada alumno o familia según su propio precio, y mandás el cobro por WhatsApp. Además llevás el control de quién ya pagó y ves tus ingresos del mes en una sola pantalla.",
      en: "The app for coaches who teach outside a classroom. Take attendance from your phone — even with no signal — and PayCoach works out what each student or family owes at their own rate, ready to send as a WhatsApp bill. It also tracks who has paid and shows your month's revenue on one screen.",
    },
    tags: ["iOS", "Web", "WhatsApp"],
    domain: "paycoach.app",
    href: "https://paycoach.app",
    internal: false,
    pageHref: "/products/paycoach",
    secondary: {
      label: { es: "App Store", en: "App Store" },
      href: "https://apps.apple.com/gt/app/paycoach/id6799230820?l=en-GB",
    },
    accent: "#34d399",
    accent2: "#0ea5e9",
    logo: paycoachLogo,
    image: shotPaycoach,
    featured: true,
  },
  {
    id: "penstrike",
    name: "Pen Strike",
    kind: { es: "Juego de navegador", en: "Browser game" },
    tagline: {
      es: "Dibujás a tu enemigo. Después lo borrás.",
      en: "Draw your enemy. Then erase it.",
    },
    blurb: {
      es: "Un shooter en primera persona, gratis y en el navegador, dibujado entero con lapicero azul sobre hoja de cuaderno. Dibujás un monstruo y peleás contra oleadas de él: cámara lenta, deslizadas, una espada-borrador y cinco mapas con parkour. Tiene tabla de puntajes, galería de monstruos de otros jugadores y partidas multijugador de 2 a 4 con un código.",
      en: "A free first-person shooter that runs in the browser, drawn entirely in blue ballpoint on notebook paper. Doodle a monster, then fight waves of it: slow-mo, slides, an eraser sword and five parkour maps. It has a leaderboard, a gallery of other players' monsters, and 2–4 player multiplayer with a room code.",
    },
    tags: ["Web", "FPS", "Multiplayer"],
    domain: "penstrike.paycoach.app",
    href: "https://penstrike.paycoach.app",
    internal: false,
    secondary: {
      label: { es: "Jugar ahora", en: "Play now" },
      href: "https://penstrike.paycoach.app/play/",
    },
    accent: "#2a2e85",
    accent2: "#c0392b",
    logo: penstrikeLogo,
    image: shotPenstrike,
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
      es: "El estudio con el que empezó todo. Video aéreo cinematográfico, fotografía con drone y vuelos FPV para bienes raíces, eventos, turismo, deportes y marcas en Guatemala. Captura en 4K y 6K, colorización de cine y entrega típica en 24 a 72 horas, con cotización directa por WhatsApp.",
      en: "The studio it all started with. Cinematic aerial video, drone photography and FPV flights for real estate, events, tourism, sports and brands in Guatemala. 4K and 6K capture, cinema color grading, and typical delivery in 24 to 72 hours, quoted directly over WhatsApp.",
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
    logo: aerovisionMark,
    logoOnDark: true,
    image: shotDrones,
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
      es: "Impresión 3D bajo pedido en Guatemala. Prototipos para probar una idea antes de fabricarla, piezas de repuesto que ya no se consiguen, figuras y encargos a medida. Mandás tu modelo listo o lo diseñamos contigo, y coordinamos todo por Instagram.",
      en: "On-demand 3D printing in Guatemala. Prototypes to test an idea before manufacturing it, replacement parts you can't buy any more, figures and custom commissions. Send a finished model or we design it with you, all coordinated over Instagram.",
    },
    tags: ["FDM", "CAD", "Guatemala"],
    domain: "instagram.com/3dprints_gt",
    href: "https://www.instagram.com/3dprints_gt",
    internal: false,
    accent: "#22d3ee",
    accent2: "#f4511e",
    logo: printsLogo,
    logoOnDark: true,
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const getProduct = (id: string): ProductItem | undefined =>
  products.find((p) => p.id === id);
