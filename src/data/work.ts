// Categorías de trabajo + galerías. Cada categoría tiene su página en /work/:slug.
// Para agregar contenido: coloca archivos en src/assets, impórtalos aquí y
// añádelos al array `items` de la categoría (y/o define `video` para hover).

import residentialAerial from "@/assets/hero-carousel/residential-aerial.jpg";
import bikeTrail from "@/assets/hero-carousel/bike-trail.jpg";
import groupPhoto from "@/assets/hero-carousel/group-photo.jpg";
import groupVideo from "@/assets/hero-carousel/group-video.mov";
import actonShowreel from "@/assets/Acton family day or sports showreel.mov";
import coastalAerial from "@/assets/hero-carousel/coastal-aerial.jpg";

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
  /** Video opcional que se reproduce al pasar el cursor (y encabeza la galería). */
  video?: string;
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
      "Videos aéreos y fotos que hacen imposible pasar de largo una propiedad. Pronto subiremos más tomas de este tipo.",
    cover: residentialAerial,
    feature: true,
    aspect: "16 / 9",
    items: [],
  },
  {
    slug: "bike",
    tag: "FPV / ACCIÓN",
    tileTitle: "Persecución en bajada",
    label: "FPV y Acción",
    blurb: "Tomas FPV rápidas e inmersivas para ciclismo, senderos y acción de alta energía.",
    cover: bikeTrail,
    aspect: "4 / 5",
    items: [],
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
    items: [],
  },
  {
    slug: "group",
    tag: "EVENTOS",
    tileTitle: "Grupos y eventos",
    label: "Grupos y Eventos",
    blurb: "Retratos grupales desde el aire y cobertura de eventos que todos quieren tener.",
    cover: groupPhoto,
    video: groupVideo,
    aspect: "4 / 5",
    items: [],
  },
  {
    slug: "tourism",
    tag: "TURISMO",
    tileTitle: "Costas y paisajes",
    label: "Turismo y Paisajes",
    blurb: "Costas, lagos y paisajes — el tipo de material que vende un destino.",
    cover: coastalAerial,
    aspect: "4 / 5",
    items: [],
  },
];

export const getCategory = (slug: string | undefined): WorkCategory | undefined =>
  workCategories.find((c) => c.slug === slug);
