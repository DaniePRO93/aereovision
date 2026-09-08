import type { Bilingual } from "@/i18n/LanguageProvider";

export const PAYCOACH_APPSTORE =
  "https://apps.apple.com/gt/app/paycoach/id6799230820?l=en-GB";
export const PAYCOACH_SITE = "https://paycoach.app";

/**
 * NOTA: el copy de funciones es un primer borrador. Ajustá los textos de
 * `features` y `updates` con lo que realmente hace la app hoy.
 */
export const paycoachCopy = {
  seo: {
    title: {
      es: "PayCoach | Tu entrenador de finanzas personales — App para iPhone",
      en: "PayCoach | Your personal finance coach — iPhone app",
    },
    description: {
      es: "PayCoach es una app de iPhone hecha por AeroVision para registrar gastos, fijar metas y entender tus finanzas mes a mes. Descárgala en el App Store.",
      en: "PayCoach is an iPhone app by AeroVision to track spending, set goals and understand your finances month to month. Download it on the App Store.",
    },
  },
  hero: {
    eyebrow: { es: "Producto · App iOS", en: "Product · iOS app" },
    titleA: { es: "Tus finanzas,", en: "Your money," },
    titleB: { es: "con entrenador.", en: "with a coach." },
    lead: {
      es: "PayCoach te acompaña mes a mes: registrás lo que gastás en segundos, ves a dónde se va tu dinero y avanzás hacia metas que sí podés cumplir.",
      en: "PayCoach walks with you month to month: log what you spend in seconds, see where your money goes, and move toward goals you can actually hit.",
    },
    store: { es: "Descargar en el App Store", en: "Download on the App Store" },
    site: { es: "Ir a paycoach.app", en: "Go to paycoach.app" },
    note: { es: "Gratis · iPhone · iOS 17+", en: "Free · iPhone · iOS 17+" },
  },
  /** Tarjetas cortas bajo el hero. */
  pillars: {
    es: [
      { title: "Registro en segundos", body: "Anotá un gasto sin salir de la pantalla principal." },
      { title: "Metas con sentido", body: "Definí un objetivo y mirá cuánto te falta, sin hojas de cálculo." },
      { title: "Coach mensual", body: "Un resumen claro de tu mes y qué conviene ajustar." },
    ],
    en: [
      { title: "Log in seconds", body: "Record an expense without leaving the main screen." },
      { title: "Goals that mean something", body: "Set a target and see how far you are, no spreadsheets." },
      { title: "Monthly coach", body: "A clear read on your month and what to adjust next." },
    ],
  },
  features: {
    eyebrow: { es: "Qué hace", en: "What it does" },
    title: { es: "Simple por fuera. Serio por dentro.", en: "Simple outside. Serious inside." },
    items: {
      es: [
        {
          tag: "Gastos",
          title: "Todo tu mes en una sola vista",
          body: "Categorías, totales y tendencias en una pantalla que se entiende de un vistazo. Sin menús escondidos ni configuración eterna antes de empezar.",
        },
        {
          tag: "Metas",
          title: "Objetivos que se sienten alcanzables",
          body: "Definí cuánto querés juntar y para cuándo. PayCoach traduce esa meta en un número diario o semanal que sí podés seguir.",
        },
        {
          tag: "Hábitos",
          title: "Te avisa antes, no después",
          body: "En vez de una regañada a fin de mes, PayCoach te muestra el rumbo mientras todavía podés corregirlo.",
        },
      ],
      en: [
        {
          tag: "Spending",
          title: "Your whole month in one view",
          body: "Categories, totals and trends on a screen you read at a glance. No hidden menus, no endless setup before you start.",
        },
        {
          tag: "Goals",
          title: "Targets that feel reachable",
          body: "Say how much you want to save and by when. PayCoach turns that into a daily or weekly number you can actually follow.",
        },
        {
          tag: "Habits",
          title: "It warns you early, not late",
          body: "Instead of a lecture at month's end, PayCoach shows you the trajectory while you can still change it.",
        },
      ],
    },
  },
  updates: {
    eyebrow: { es: "Novedades", en: "What's new" },
    title: { es: "En qué estamos trabajando.", en: "What we're working on." },
    lead: {
      es: "Cada versión, mejora y noticia de PayCoach queda registrada aquí.",
      en: "Every PayCoach release, improvement and announcement lands here.",
    },
  },
  cta: {
    title: { es: "Descargala y probala hoy.", en: "Download it and try it today." },
    lead: {
      es: "PayCoach está disponible en el App Store para iPhone.",
      en: "PayCoach is available on the App Store for iPhone.",
    },
  },
} satisfies { seo: Record<string, Bilingual<string>> } & Record<string, unknown>;
