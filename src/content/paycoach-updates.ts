import type { Bilingual } from "@/i18n/LanguageProvider";

export interface PayCoachUpdate {
  /** ISO (YYYY-MM-DD). Se muestra formateado según el idioma. */
  date: string;
  /** Versión de la app, si aplica. */
  version?: string;
  /** Etiqueta corta: Lanzamiento, Mejora, Noticia... */
  tag: Bilingual<string>;
  title: Bilingual<string>;
  body: Bilingual<string>;
}

/**
 * Feed de novedades de PayCoach.
 * Para publicar algo nuevo: agregá un objeto AL INICIO de este arreglo.
 * No hace falta tocar ningún componente.
 */
export const paycoachUpdates: PayCoachUpdate[] = [
  {
    date: "2026-08-20",
    version: "1.1",
    tag: { es: "Mejora", en: "Improvement" },
    title: {
      es: "Resumen mensual más claro",
      en: "A clearer monthly summary",
    },
    body: {
      es: "Rediseñamos la pantalla de resumen para que el total del mes, las categorías más pesadas y el avance de tus metas se lean de un solo vistazo.",
      en: "We redesigned the summary screen so your month total, heaviest categories and goal progress all read at a single glance.",
    },
  },
  {
    date: "2026-07-02",
    version: "1.0",
    tag: { es: "Lanzamiento", en: "Launch" },
    title: {
      es: "PayCoach ya está en el App Store",
      en: "PayCoach is live on the App Store",
    },
    body: {
      es: "La primera versión pública de PayCoach ya se puede descargar para iPhone: registro de gastos, categorías y metas de ahorro.",
      en: "The first public version of PayCoach is downloadable for iPhone: expense tracking, categories and savings goals.",
    },
  },
];

/** Fecha legible según idioma, sin depender de librerías externas. */
export const formatUpdateDate = (iso: string, lang: "es" | "en"): string => {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-GT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
