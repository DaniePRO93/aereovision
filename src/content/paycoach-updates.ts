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
      es: "Resumen del mes más claro para las familias",
      en: "A clearer monthly summary for families",
    },
    body: {
      es: "Rediseñamos el resumen que se manda por WhatsApp: ahora se ven las clases asistidas, el total por alumno y el total de la familia en un mismo mensaje.",
      en: "We redesigned the summary you send over WhatsApp: sessions attended, each student's total and the family total now fit in a single message.",
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
      es: "La primera versión pública ya se puede descargar para iPhone: asistencia sin señal, precio por alumno, agrupación por familia y cobro por WhatsApp.",
      en: "The first public version is downloadable for iPhone: offline attendance, per-student pricing, family grouping and WhatsApp billing.",
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
