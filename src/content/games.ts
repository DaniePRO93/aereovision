import type { Bilingual } from "@/i18n/LanguageProvider";

export const gamesCopy = {
  seo: {
    title: {
      es: "Juegos | AeroVision — Juega en el navegador",
      en: "Games | AeroVision — Play in your browser",
    },
    description: {
      es: "Juegos originales hechos por AeroVision: Grand Theft Xela, Solar System, Midnight Take, Loopfire y Raze & Raise. Gratis, sin descargas, directo en el navegador.",
      en: "Original games made by AeroVision: Grand Theft Xela, Solar System, Midnight Take, Loopfire and Raze & Raise. Free, no downloads, right in your browser.",
    },
  },
  hero: {
    eyebrow: { es: "Juegos", en: "Games" },
    count: { es: "juegos", en: "games" },
    titleA: { es: "Hechos para", en: "Made to" },
    titleB: { es: "jugarse ya.", en: "play right now." },
    lead: {
      es: "Juegos originales del estudio. Sin descargas ni cuentas: abre uno y juega en tu computadora o en tu teléfono.",
      en: "Original games from the studio. No downloads, no accounts: open one and play on your computer or your phone.",
    },
  },
  play: { es: "Jugar", en: "Play" },
  desktopOnly: { es: "Teclado y mouse", en: "Keyboard & mouse" },
  external: { es: "Abre en otro sitio", en: "Opens on another site" },
} satisfies { seo: Record<string, Bilingual<string>> } & Record<string, unknown>;
