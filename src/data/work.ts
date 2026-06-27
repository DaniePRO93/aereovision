// Work categories + gallery media. Each category has its own page at /work/:slug.
// To add content: drop files in src/assets, import them here, and push an entry
// into the matching category's `items` array (and/or set `video` for hover-play).

import residentialAerial from "@/assets/hero-carousel/residential-aerial.jpg";
import realEstateAerial from "@/assets/real-estate-aerial.jpg";
import cityscape from "@/assets/hero-drone-cityscape.jpg";
import bikeTrail from "@/assets/hero-carousel/bike-trail.jpg";
import fpvAction from "@/assets/fpv-drone-action.jpg";
import groupPhoto from "@/assets/hero-carousel/group-photo.jpg";
import groupVideo from "@/assets/hero-carousel/group-video.mov";
import actonShowreel from "@/assets/Acton family day or sports showreel.mov";
import coastalAerial from "@/assets/hero-carousel/coastal-aerial.jpg";
import landscapeAerial from "@/assets/landscape-aerial.jpg";
import mountainLake from "@/assets/mountain-lake-aerial.jpg";

export interface WorkMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption?: string;
}

export interface WorkCategory {
  slug: string;
  /** Eyebrow label on tiles + page. */
  tag: string;
  /** Short tile title. */
  tileTitle: string;
  /** Gallery page heading. */
  label: string;
  blurb: string;
  /** Poster image for the tile. */
  cover: string;
  /** Optional video that plays on hover (and headlines the gallery page). */
  video?: string;
  /** Renders as the large 16:9 feature tile when true. */
  feature?: boolean;
  /** Tile aspect ratio, e.g. "4 / 5". */
  aspect: string;
  /** Gallery contents. Extend freely as more is uploaded. */
  items: WorkMedia[];
}

export const workCategories: WorkCategory[] = [
  {
    slug: "home",
    tag: "REAL ESTATE",
    tileTitle: "Homes & real estate",
    label: "Homes & Real Estate",
    blurb:
      "Aerial films and stills that make a property impossible to scroll past — hover or tap to watch, more shots below.",
    cover: residentialAerial,
    // TODO: drop the home fly-through here for hover-play in the feature tile.
    feature: true,
    aspect: "16 / 9",
    items: [
      { type: "image", src: residentialAerial, caption: "Hillside residential community" },
      { type: "image", src: realEstateAerial, caption: "Modern home exterior" },
      { type: "image", src: cityscape, caption: "Neighborhood overview" },
    ],
  },
  {
    slug: "bike",
    tag: "FPV / ACTION",
    tileTitle: "Downhill trail chase",
    label: "FPV & Action",
    blurb: "Fast, immersive FPV chase work for biking, trails and high-energy action.",
    cover: bikeTrail,
    aspect: "4 / 5",
    items: [
      { type: "image", src: bikeTrail, caption: "Downhill trail chase" },
      { type: "image", src: fpvAction, caption: "FPV drone in action" },
    ],
  },
  {
    slug: "sports",
    tag: "EVENTS / SPORTS",
    tileTitle: "Acton family day & sports",
    label: "Events & Sports",
    blurb: "Family days, tournaments and sports events captured from the air and edited fast.",
    cover: groupPhoto,
    video: actonShowreel,
    aspect: "4 / 5",
    items: [
      { type: "video", src: actonShowreel, poster: groupPhoto, caption: "Acton family day & sports showreel" },
      { type: "image", src: groupPhoto, caption: "Overhead group portrait" },
    ],
  },
  {
    slug: "group",
    tag: "EVENTS",
    tileTitle: "Group & event coverage",
    label: "Group & Events",
    blurb: "Overhead group portraits and event coverage that everyone wants a copy of.",
    cover: groupPhoto,
    video: groupVideo,
    aspect: "4 / 5",
    items: [
      { type: "video", src: groupVideo, poster: groupPhoto, caption: "Aerial group reveal" },
      { type: "image", src: groupPhoto, caption: "Overhead group portrait" },
    ],
  },
  {
    slug: "tourism",
    tag: "TOURISM",
    tileTitle: "Coastline & landscapes",
    label: "Tourism & Landscapes",
    blurb: "Coastlines, lakes and landscapes — the kind of footage that sells a destination.",
    cover: coastalAerial,
    aspect: "4 / 5",
    items: [
      { type: "image", src: coastalAerial, caption: "Pacific coastline & mangroves" },
      { type: "image", src: landscapeAerial, caption: "Highland landscape" },
      { type: "image", src: mountainLake, caption: "Mountain lake" },
    ],
  },
];

export const getCategory = (slug: string | undefined): WorkCategory | undefined =>
  workCategories.find((c) => c.slug === slug);
