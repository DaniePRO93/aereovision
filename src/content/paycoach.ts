import type { Bilingual } from "@/i18n/LanguageProvider";

export const PAYCOACH_APPSTORE =
  "https://apps.apple.com/gt/app/paycoach/id6799230820?l=en-GB";
export const PAYCOACH_SITE = "https://paycoach.app";

/**
 * Copy basado en lo que la app hace hoy (paycoach.app + ficha del App Store):
 * asistencia, cobros por alumno/familia y control de pagos para academias
 * deportivas. Si cambian las funciones, se edita aquí.
 */
export const paycoachCopy = {
  seo: {
    title: {
      es: "PayCoach | Asistencia y cobros para academias deportivas — App iOS y web",
      en: "PayCoach | Attendance and billing for sports academies — iOS and web app",
    },
    description: {
      es: "PayCoach es la app de AeroVision para entrenadores: pasa asistencia sin señal, calcula el cobro de cada alumno o familia y lo envía por WhatsApp. Gratis en el App Store.",
      en: "PayCoach is AeroVision's app for coaches: take attendance offline, work out what each student or family owes, and send the bill over WhatsApp. Free on the App Store.",
    },
  },
  hero: {
    eyebrow: { es: "Producto · App iOS y web", en: "Product · iOS and web app" },
    titleA: { es: "Tu academia,", en: "Your academy," },
    titleB: { es: "sin papeles.", en: "without paperwork." },
    lead: {
      es: "PayCoach es para entrenadores que dan clase fuera del aula: en la cancha, la pista o el parque. Pasás asistencia desde el teléfono, la app calcula lo que debe cada alumno y mandás el cobro por WhatsApp. Tres cosas, siempre claras: quién vino, cómo va y qué se le debe.",
      en: "PayCoach is for coaches who teach outside a classroom — on the field, the track, the park. Take attendance from your phone, the app works out what each student owes, and you send the bill over WhatsApp. Three things, always clear: who showed up, how they're doing, and what they owe.",
    },
    store: { es: "Descargar en el App Store", en: "Download on the App Store" },
    site: { es: "Ir a paycoach.app", en: "Go to paycoach.app" },
    note: {
      es: "Gratis · iPhone y navegador · iOS 17+",
      en: "Free · iPhone and browser · iOS 17+",
    },
  },
  /** Tarjetas cortas bajo el hero. */
  pillars: {
    es: [
      {
        title: "Asistencia sin señal",
        body: "Marcás quién vino en la cancha misma. Si no hay internet, se guarda y se sincroniza después.",
      },
      {
        title: "Precio por alumno",
        body: "Cada quien puede tener su propia tarifa, y los hermanos se cobran juntos como familia.",
      },
      {
        title: "Cobro por WhatsApp",
        body: "El resumen del mes sale armado y se manda por WhatsApp sin copiar nada a mano.",
      },
    ],
    en: [
      {
        title: "Attendance without signal",
        body: "Mark who showed up right there on the field. No internet? It saves and syncs later.",
      },
      {
        title: "A price per student",
        body: "Everyone can have their own rate, and siblings get billed together as one family.",
      },
      {
        title: "Billing over WhatsApp",
        body: "The month's summary comes out ready to send on WhatsApp — nothing retyped by hand.",
      },
    ],
  },
  features: {
    eyebrow: { es: "Qué hace", en: "What it does" },
    title: {
      es: "Hecho para la cancha, no para el escritorio.",
      en: "Built for the field, not the desk.",
    },
    items: {
      es: [
        {
          tag: "Asistencia",
          title: "Pasar lista en segundos, con o sin internet",
          body: "Abrís la clase, marcás a los que llegaron y listo. La app funciona sin señal —algo normal en canchas y pistas— y sincroniza sola cuando vuelve la conexión. Nada de anotar en papel para pasarlo en la noche.",
        },
        {
          tag: "Cobros",
          title: "El cobro se calcula solo, alumno por alumno",
          body: "Cada alumno puede tener su propio precio, y las familias con varios hijos se agrupan en una sola cuenta. Al cerrar el mes, PayCoach arma el total de cada quien y lo envías por WhatsApp con el detalle de las clases.",
        },
        {
          tag: "Control",
          title: "Sabés quién ya pagó y cuánto llevás",
          body: "Marcás los pagos conforme entran y la app te muestra quién está al día y quién no. Los gráficos de ingresos por mes te dicen cómo va la academia sin abrir una hoja de cálculo.",
        },
      ],
      en: [
        {
          tag: "Attendance",
          title: "Take the register in seconds, online or not",
          body: "Open the class, tap who turned up, done. The app works with no signal — normal on fields and tracks — and syncs itself once you're back. No paper list to type up at night.",
        },
        {
          tag: "Billing",
          title: "The bill adds itself up, student by student",
          body: "Each student can have their own price, and families with several kids are grouped into one account. At month's end PayCoach builds every total and you send it over WhatsApp with the sessions listed.",
        },
        {
          tag: "Control",
          title: "You know who paid and where you stand",
          body: "Mark payments as they arrive and the app shows who's up to date and who isn't. Monthly revenue charts tell you how the academy is doing without opening a spreadsheet.",
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
    title: { es: "Probala con tu grupo esta semana.", en: "Try it with your group this week." },
    lead: {
      es: "PayCoach es gratis en el App Store y también funciona desde el navegador, sin instalar nada.",
      en: "PayCoach is free on the App Store and also runs in the browser, with nothing to install.",
    },
  },
} satisfies { seo: Record<string, Bilingual<string>> } & Record<string, unknown>;
