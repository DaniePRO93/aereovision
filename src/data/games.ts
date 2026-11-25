// Juegos publicados en /games. Los juegos propios son HTML independientes en
// public/play/<slug>.html; los que viven en otro dominio usan `externalUrl`.
// La portada es una captura en src/assets/games.

import type { Bilingual } from "@/i18n/LanguageProvider";
import gtaXelaCover from "@/assets/games/gta-xela.jpg";
import loopfireCover from "@/assets/games/loopfire.jpg";
import midnightTakeCover from "@/assets/games/midnight-take.jpg";
import razeAndRaiseCover from "@/assets/games/raze-and-raise.jpg";
import solarSystemCover from "@/assets/games/solar-system.jpg";

export interface Game {
  slug: string;
  name: string;
  genre: Bilingual<string>;
  blurb: Bilingual<string>;
  cover: string;
  /** Color de acento de la tarjeta, tomado del propio juego. */
  accent: string;
  /** Si el juego vive fuera de este sitio. */
  externalUrl?: string;
  /** Solo se puede jugar con teclado y mouse. */
  desktopOnly?: boolean;
}

export const games: Game[] = [
  {
    slug: "gta-xela",
    name: "Grand Theft Xela",
    genre: { es: "Mundo abierto · Parodia", en: "Open world · Parody" },
    blurb: {
      es: "Una parodia de mundo abierto en Quetzaltenango: misiones, carros, motos y caos por toda Xela. Todo es ficción.",
      en: "An open-world parody set in Quetzaltenango, Guatemala: missions, cars, motorbikes and chaos all over Xela. All fiction.",
    },
    cover: gtaXelaCover,
    accent: "#ffd23f",
    externalUrl: "https://gta-xela.pages.dev",
    desktopOnly: true,
  },
  {
    slug: "solar-system",
    name: "Solar System",
    genre: { es: "Exploración 3D", en: "3D exploration" },
    blurb: {
      es: "Recorre el sistema solar, entra a la atmósfera de cada planeta y completa un reto en su superficie.",
      en: "Tour the solar system, dive through each planet's atmosphere and take on a challenge on its surface.",
    },
    cover: solarSystemCover,
    accent: "#ffb347",
  },
  {
    slug: "midnight-take",
    name: "Midnight Take",
    genre: { es: "Sigilo", en: "Stealth" },
    blurb: {
      es: "Seis golpes, una noche. Esquiva las linternas, toma el botín y sal por donde entraste.",
      en: "Six jobs, one night. Slip past the flashlights, lift the prize and walk out the way you came.",
    },
    cover: midnightTakeCover,
    accent: "#ffd76a",
  },
  {
    slug: "loopfire",
    name: "Loopfire",
    genre: { es: "Arcade", en: "Arcade" },
    blurb: {
      es: "Dibuja una estela de fuego y cierra el lazo: todo lo que quede adentro se quema.",
      en: "Draw a trail of fire and close the loop: everything caught inside burns.",
    },
    cover: loopfireCover,
    accent: "#ff8a2a",
  },
  {
    slug: "raze-and-raise",
    name: "Raze & Raise",
    genre: { es: "Física 3D", en: "3D physics" },
    blurb: {
      es: "Derriba ocho edificios con una bola de demolición y luego construye el tuyo a ver si aguanta un terremoto.",
      en: "Wreck eight buildings with a wrecking ball, then build your own and see if it survives an earthquake.",
    },
    cover: razeAndRaiseCover,
    accent: "#ff5a63",
  },
];

export const gameUrl = (game: Game) => game.externalUrl ?? `/play/${game.slug}.html`;
