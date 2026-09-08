import type { Bilingual } from "@/i18n/LanguageProvider";

export const productsCopy = {
  seo: {
    title: {
      es: "Productos | AeroVision — PayCoach, cine aéreo con drones e impresión 3D",
      en: "Products | AeroVision — PayCoach, aerial drone cinema and 3D printing",
    },
    description: {
      es: "Los negocios que AeroVision construye y opera: PayCoach para iOS, el estudio de cine aéreo AeroVision Drones y el taller 3D Prints GT.",
      en: "The businesses AeroVision builds and runs: PayCoach for iOS, the AeroVision Drones aerial film studio, and the 3D Prints GT workshop.",
    },
  },
  hero: {
    eyebrow: { es: "Productos", en: "Products" },
    titleA: { es: "Todo lo que", en: "Everything we" },
    titleB: { es: "hemos lanzado.", en: "have shipped." },
    lead: {
      es: "Cada producto es un negocio completo: su propia marca, sus propios clientes y su propio equipo. Aquí están, con la puerta abierta.",
      en: "Every product is a whole business: its own brand, its own customers, its own team. Here they are, with the door open.",
    },
  },
  labels: {
    about: { es: "Sobre el producto", en: "About the product" },
    index: { es: "Producto", en: "Product" },
  },
  cta: {
    eyebrow: { es: "¿Y lo siguiente?", en: "What's next?" },
    title: { es: "Siempre hay algo en el taller.", en: "There's always something on the bench." },
    lead: {
      es: "Si tienes una idea que quieres convertir en producto —o quieres trabajar con alguno de los que ya existen— escríbenos.",
      en: "If you have an idea you want turned into a product — or want to work with one of these — write to us.",
    },
    button: { es: "Escribir por WhatsApp", en: "Message on WhatsApp" },
  },
} satisfies { seo: Record<string, Bilingual<string>> } & Record<string, unknown>;
