// Categorías de trabajo + galerías. Cada categoría tiene su página en /work/:slug.
// Para agregar contenido: coloca archivos en src/assets/work, impórtalos aquí y
// añádelos al array `items` de la categoría (y/o define `video` para hover).

import groupPhoto from "@/assets/hero-carousel/group-photo.jpg";
import actonShowreel from "@/assets/work/acton-showreel.mp4";

import accionPortada from "@/assets/work/accion-portada.mp4";
import accionPortadaPoster from "@/assets/work/accion-portada-poster.jpg";
import accionSalto from "@/assets/work/accion-salto.mp4";
import accionSaltoPoster from "@/assets/work/accion-salto-poster.jpg";
import homeRoof from "@/assets/work/home-roof.jpg";
import homeOutside from "@/assets/work/home-outside.jpg";
import homePullout from "@/assets/work/home-pullout.mp4";
import homeTour from "@/assets/work/home-tour.mp4";
import groupWave from "@/assets/work/group-wave.mp4";
import groupWavePoster from "@/assets/work/group-wave-poster.jpg";
import beachNeighborhood from "@/assets/work/beach-neighborhood.jpg";
import mangroves from "@/assets/work/mangroves.jpg";

export interface WorkMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption?: string;
}

export interface WorkCategory {
  slug: string;
  /** Etiqueta superior en las tarjetas + página. */
  tag: string;
  /** Título corto en la tarjeta. */
  tileTitle: string;
  /** Encabezado de la página de galería. */
  label: string;
  blurb: string;
  /** Imagen de portada de la tarjeta. */
  cover: string;
  /** Video opcional que se reproduce al pasar el cursor en la tarjeta. */
  video?: string;
  /** Video que encabeza la página de galería (si difiere del de la tarjeta). */
  featureVideo?: string;
  /** URL de YouTube/Vimeo (embed) para videos largos que no se suben al repo. */
  embedUrl?: string;
  /** Se muestra como tarjeta destacada 16:9 cuando es true. */
  feature?: boolean;
  /** Proporción de la tarjeta, ej. "4 / 5". */
  aspect: string;
  /** Contenido de la galería. Se irá llenando conforme se suban fotos/videos. */
  items: WorkMedia[];
}

export const workCategories: WorkCategory[] = [
  {
    slug: "home",
    tag: "BIENES RAÍCES",
    tileTitle: "Casas y bienes raíces",
    label: "Casas y Bienes Raíces",
    blurb:
      "Recorridos aéreos y fotos que hacen imposible pasar de largo una propiedad. Mira el tour completo y más tomas abajo.",
    cover: homeOutside,
    video: homePullout,
    featureVideo: homeTour,
    feature: true,
    aspect: "16 / 9",
    items: [
      { type: "image", src: homeRoof, caption: "Vista del techo y jardín" },
      { type: "image", src: homeOutside, caption: "Exterior de la casa" },
    ],
  },
  {
    slug: "accion",
    tag: "ACCIÓN",
    tileTitle: "Bajadas",
    label: "Acción",
    blurb: "Tomas de acción rápidas e inmersivas: bajadas, ciclismo y senderos de alta energía.",
    cover: accionPortadaPoster,
    video: accionPortada,
    featureVideo: accionPortada,
    aspect: "4 / 5",
    items: [{ type: "video", src: accionSalto, poster: accionSaltoPoster, caption: "Salto en bici" }],
  },
  {
    slug: "sports",
    tag: "EVENTOS / DEPORTES",
    tileTitle: "Día familiar y deportes",
    label: "Eventos y Deportes",
    blurb: "Días familiares, torneos y eventos deportivos capturados desde el aire y editados rápido.",
    cover: groupPhoto,
    video: actonShowreel,
    aspect: "4 / 5",
    items: [
      { type: "video", src: actonShowreel, poster: groupPhoto, caption: "Día familiar y deportes — Acton" },
      { type: "image", src: groupPhoto, caption: "Retrato grupal desde el aire" },
    ],
  },
  {
    slug: "group",
    tag: "EVENTOS",
    tileTitle: "Grupos y eventos",
    label: "Grupos y Eventos",
    blurb: "Retratos grupales desde el aire y cobertura de eventos que todos quieren tener.",
    cover: groupWavePoster,
    video: groupWave,
    aspect: "4 / 5",
    items: [{ type: "video", src: groupWave, poster: groupWavePoster, caption: "Saludo grupal desde el aire" }],
  },
  {
    slug: "tourism",
    tag: "TURISMO",
    tileTitle: "Costas y paisajes",
    label: "Turismo y Paisajes",
    blurb: "Costas, lagos y paisajes — el tipo de material que vende un destino.",
    cover: beachNeighborhood,
    aspect: "4 / 5",
    items: [
      { type: "image", src: beachNeighborhood, caption: "Vecindario frente a la playa" },
      { type: "image", src: mangroves, caption: "Manglares en la costa" },
    ],
  },
];

export const getCategory = (slug: string | undefined): WorkCategory | undefined =>
  workCategories.find((c) => c.slug === slug);
