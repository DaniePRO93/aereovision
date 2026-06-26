// Service catalogue + process steps for the AeroVision homepage.
// Ported from the Claude Design handoff (AeroVision.dc.html).

export interface Tier {
  name: string;
  price: number;
  popular?: boolean;
  items: string[];
}

export interface Extra {
  name: string;
  price: number;
}

export interface Service {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  from: number;
  highlights: string[];
  tiers: Tier[];
  extras: Extra[];
}

export const services: Service[] = [
  {
    id: "aerial-video",
    tag: "FILM",
    title: "Cinematic Aerial Video",
    blurb:
      "Color-graded aerial films for brands, real estate and tourism — built to stop the scroll.",
    from: 60,
    highlights: ["Pro editing & color grade", "Cinematic + social cuts", "Licensed music"],
    tiers: [
      {
        name: "Starter",
        price: 60,
        items: [
          "5 short aerial clips (30s–1m)",
          "Basic moves: pan, rise, orbit",
          "Fast WhatsApp delivery",
          "Social-ready format",
        ],
      },
      {
        name: "Standard",
        price: 180,
        popular: true,
        items: [
          "10 clips with a basic story",
          "1–2 min edited film + music",
          "Multiple angles & altitudes",
          "Organized Drive / WhatsApp delivery",
        ],
      },
      {
        name: "Pro",
        price: 350,
        items: [
          "20 detail-driven clips",
          "2–3 min trailer-style edit",
          "Pro music & dynamic cuts",
          "Cinematic + vertical reel cuts",
          "Visual map of key points",
        ],
      },
    ],
    extras: [
      { name: "Extra clips (per 5)", price: 25 },
      { name: "Custom music", price: 50 },
      { name: "Rush 24h delivery", price: 30 },
      { name: "Golden-hour shoot", price: 35 },
      { name: "Extended version", price: 40 },
    ],
  },
  {
    id: "aerial-photo",
    tag: "REAL ESTATE · EVENTS",
    title: "Aerial Photography",
    blurb:
      "High-resolution stills for listings, events and campaigns — professionally graded.",
    from: 50,
    highlights: ["Up to 50+ high-res photos", "JPEG + RAW + edited", "Multiple angles"],
    tiers: [
      {
        name: "Starter",
        price: 50,
        items: ["5–10 high-res photos", "Basic editing", "5 min flight time", "JPEG delivery"],
      },
      {
        name: "Standard",
        price: 150,
        popular: true,
        items: [
          "20–30 high-res photos",
          "Pro edit & color correction",
          "10–15 min flight time",
          "JPEG + RAW",
          "Property highlight shots",
        ],
      },
      {
        name: "Pro",
        price: 250,
        items: [
          "50+ high-res photos",
          "Premium edit & advanced grading",
          "20–25 min flight time",
          "Artistic compositions",
          "Aerial + ground combo",
          "Commercial usage rights",
        ],
      },
    ],
    extras: [
      { name: "Extra flight time (per min)", price: 15 },
      { name: "Rush 24h delivery", price: 25 },
      { name: "Extra edit requests", price: 20 },
      { name: "Golden-hour / sunset", price: 30 },
      { name: "360° panoramas", price: 40 },
    ],
  },
  {
    id: "drone-tours",
    tag: "Drone Tours",
    title: "Drone Tours",
    blurb:
      "Immersive single-take fly-throughs of any property or space — the shot everyone stops to watch.",
    from: 80,
    highlights: ["Creative single-take routes", "Up to 6K capture", "Indoor + outdoor"],
    tiers: [
      {
        name: "Starter",
        price: 80,
        items: ["Basic tour footage", "4 min flight time", "Standard post", "Single route"],
      },
      {
        name: "Standard",
        price: 240,
        popular: true,
        items: [
          "Pro tour footage",
          "8 min flight time",
          "Creative routes & tracking",
          "4K + advanced post",
          "Smooth transitions",
        ],
      },
      {
        name: "Pro",
        price: 450,
        items: [
          "FPV + cinematic drone combo",
          "15 min flight time",
          "Complex multi-path routes",
          "6K + cinematic post",
          "Advanced VFX & speed ramps",
          "Music sync + commercial delivery",
        ],
      },
    ],
    extras: [
      { name: "Extra complex routes", price: 40 },
      { name: "Indoor + outdoor combo", price: 60 },
      { name: "Slow-motion sequences", price: 35 },
      { name: "Custom flight patterns", price: 50 },
      { name: "Low-light / night tour", price: 70 },
    ],
  },
  {
    id: "action-sports",
    tag: "Action Sports",
    title: "Action Sports",
    blurb:
      "Dynamic biking, motocross, surf and trail sessions with FPV chase angles and Insta360 footage.",
    from: 35,
    highlights: ["FPV + stabilized angles", "Insta360 x3 immersive footage", "Social reels included"],
    tiers: [
      {
        name: "Starter",
        price: 35,
        items: [
          "5 clips, 30s each",
          "~3 min total footage",
          "FPV or stabilized drone",
          "Fast WhatsApp delivery",
        ],
      },
      {
        name: "Standard",
        price: 50,
        popular: true,
        items: [
          "10 clips, 30s each",
          "~5 min total footage",
          "1–2 min edited video",
          "Insta360 x3 immersive angles",
          "Dynamic rider tracking",
        ],
      },
      {
        name: "Pro",
        price: 80,
        items: [
          "15–20 clips, 30s each",
          "3–5 min edited main film",
          "2 social-optimized reels",
          "Insta360 x3 + aerial combo",
          "Extended multi-battery session",
          "Action music sync",
        ],
      },
    ],
    extras: [
      { name: "Extra clips (per 5)", price: 20 },
      { name: "Multi-location session", price: 45 },
      { name: "Night shoot with lights", price: 60 },
      { name: "Specialized slow motion", price: 30 },
      { name: "Insta360 x3 add-on", price: 40 },
    ],
  },
];

export interface Step {
  n: string;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    n: "01",
    title: "Brief & quote",
    desc: "Message us your goal, location and date. We confirm scope and a fixed price — no surprises.",
  },
  {
    n: "02",
    title: "Plan & permits",
    desc: "We scout the site, check airspace and weather, and lock the shot list before wheels-up.",
  },
  {
    n: "03",
    title: "Fly & capture",
    desc: "On-site capture in 4K/6K with cinematic drone and FPV rigs, plus ground angles when needed.",
  },
  {
    n: "04",
    title: "Edit & color grade",
    desc: "We cut, stabilize and color-grade in-house so every frame looks like a film, not a clip.",
  },
  {
    n: "05",
    title: "Deliver & promote",
    desc: "You get cinematic and vertical cuts, ready for listings, ads and Instagram — fast.",
  },
];
