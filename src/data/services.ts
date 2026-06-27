// Catálogo de servicios + pasos del proceso para la página de AeroVision.

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
    tag: "VIDEO",
    title: "Video Aéreo Cinematográfico",
    blurb:
      "Videos aéreos con colorización profesional para marcas, bienes raíces y turismo — hechos para detener el scroll.",
    from: 60,
    highlights: ["Edición y colorización pro", "Cortes cinematográficos + redes", "Música licenciada"],
    tiers: [
      {
        name: "Inicial",
        price: 60,
        items: [
          "5 clips aéreos cortos (30s–1m)",
          "Movimientos básicos: paneo, ascenso, órbita",
          "Entrega rápida por WhatsApp",
          "Formato listo para redes",
        ],
      },
      {
        name: "Estándar",
        price: 180,
        popular: true,
        items: [
          "10 clips con una historia básica",
          "Video editado de 1–2 min + música",
          "Múltiples ángulos y alturas",
          "Entrega organizada por Drive / WhatsApp",
        ],
      },
      {
        name: "Pro",
        price: 350,
        items: [
          "20 clips con detalle",
          "Edición tipo tráiler de 2–3 min",
          "Música pro y cortes dinámicos",
          "Cortes cinematográfico + reel vertical",
          "Mapa visual de puntos clave",
        ],
      },
    ],
    extras: [
      { name: "Clips extra (por 5)", price: 25 },
      { name: "Música personalizada", price: 50 },
      { name: "Entrega urgente 24h", price: 30 },
      { name: "Toma en hora dorada", price: 35 },
      { name: "Versión extendida", price: 40 },
    ],
  },
  {
    id: "aerial-photo",
    tag: "BIENES RAÍCES · EVENTOS",
    title: "Fotografía Aérea",
    blurb:
      "Fotos en alta resolución para propiedades, eventos y campañas — con edición profesional.",
    from: 50,
    highlights: ["Hasta 50+ fotos en alta resolución", "JPEG + RAW + editadas", "Múltiples ángulos"],
    tiers: [
      {
        name: "Inicial",
        price: 50,
        items: ["5–10 fotos en alta resolución", "Edición básica", "5 min de vuelo", "Entrega en JPEG"],
      },
      {
        name: "Estándar",
        price: 150,
        popular: true,
        items: [
          "20–30 fotos en alta resolución",
          "Edición pro y corrección de color",
          "10–15 min de vuelo",
          "JPEG + RAW",
          "Tomas destacadas de la propiedad",
        ],
      },
      {
        name: "Pro",
        price: 250,
        items: [
          "50+ fotos en alta resolución",
          "Edición premium y colorización avanzada",
          "20–25 min de vuelo",
          "Composiciones artísticas",
          "Combo aéreo + terrestre",
          "Derechos de uso comercial",
        ],
      },
    ],
    extras: [
      { name: "Tiempo de vuelo extra (por min)", price: 15 },
      { name: "Entrega urgente 24h", price: 25 },
      { name: "Ediciones adicionales", price: 20 },
      { name: "Hora dorada / atardecer", price: 30 },
      { name: "Panorámicas 360°", price: 40 },
    ],
  },
  {
    id: "drone-tours",
    tag: "TOURS CON DRONE",
    title: "Tours con Drone",
    blurb:
      "Recorridos inmersivos de una sola toma por cualquier propiedad o espacio — la toma que todos se detienen a ver.",
    from: 80,
    highlights: ["Rutas creativas de una toma", "Captura hasta 6K", "Interior + exterior"],
    tiers: [
      {
        name: "Inicial",
        price: 80,
        items: ["Material básico del recorrido", "4 min de vuelo", "Post-producción estándar", "Una sola ruta"],
      },
      {
        name: "Estándar",
        price: 240,
        popular: true,
        items: [
          "Material pro del recorrido",
          "8 min de vuelo",
          "Rutas creativas y seguimiento",
          "4K + post-producción avanzada",
          "Transiciones suaves",
        ],
      },
      {
        name: "Pro",
        price: 450,
        items: [
          "Combo FPV + drone cinematográfico",
          "15 min de vuelo",
          "Rutas complejas de varios caminos",
          "6K + post-producción cinematográfica",
          "VFX avanzados y speed ramps",
          "Sincronía musical + entrega comercial",
        ],
      },
    ],
    extras: [
      { name: "Rutas complejas extra", price: 40 },
      { name: "Combo interior + exterior", price: 60 },
      { name: "Secuencias en cámara lenta", price: 35 },
      { name: "Patrones de vuelo a medida", price: 50 },
      { name: "Tour nocturno / poca luz", price: 70 },
    ],
  },
  {
    id: "action-sports",
    tag: "DEPORTES DE ACCIÓN",
    title: "Deportes de Acción",
    blurb:
      "Ciclismo, motocross, surf y senderos dinámicos con ángulos de persecución FPV y material Insta360.",
    from: 35,
    highlights: ["FPV + ángulos estabilizados", "Material inmersivo Insta360 x3", "Reels para redes incluidos"],
    tiers: [
      {
        name: "Inicial",
        price: 35,
        items: [
          "5 clips, 30s cada uno",
          "~3 min de material total",
          "Drone FPV o estabilizado",
          "Entrega rápida por WhatsApp",
        ],
      },
      {
        name: "Estándar",
        price: 50,
        popular: true,
        items: [
          "10 clips, 30s cada uno",
          "~5 min de material total",
          "Video editado de 1–2 min",
          "Ángulos inmersivos Insta360 x3",
          "Seguimiento dinámico del rider",
        ],
      },
      {
        name: "Pro",
        price: 80,
        items: [
          "15–20 clips, 30s cada uno",
          "Video principal editado de 3–5 min",
          "2 reels optimizados para redes",
          "Insta360 x3 + combo aéreo",
          "Sesión extendida con varias baterías",
          "Sincronía musical de acción",
        ],
      },
    ],
    extras: [
      { name: "Clips extra (por 5)", price: 20 },
      { name: "Sesión en varias locaciones", price: 45 },
      { name: "Toma nocturna con luces", price: 60 },
      { name: "Cámara lenta especializada", price: 30 },
      { name: "Add-on Insta360 x3", price: 40 },
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
    title: "Brief y cotización",
    desc: "Escríbenos tu objetivo, ubicación y fecha. Confirmamos el alcance y un precio fijo — sin sorpresas.",
  },
  {
    n: "02",
    title: "Plan y permisos",
    desc: "Revisamos la locación, el espacio aéreo y el clima, y cerramos el shot list antes de despegar.",
  },
  {
    n: "03",
    title: "Vuelo y captura",
    desc: "Captura en sitio en 4K/6K con drone cinematográfico y equipos FPV, más ángulos terrestres cuando hace falta.",
  },
  {
    n: "04",
    title: "Edición y colorización",
    desc: "Cortamos, estabilizamos y colorizamos en casa para que cada toma parezca cine, no un clip.",
  },
  {
    n: "05",
    title: "Entrega y promoción",
    desc: "Recibes cortes cinematográfico y vertical, listos para propiedades, anuncios e Instagram — rápido.",
  },
];
