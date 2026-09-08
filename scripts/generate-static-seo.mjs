import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://aerovision.gt";
const siteName = "AeroVision";
const defaultImage = `${siteUrl}/og-image.jpg`;
const distDir = path.join(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");
const defaultLastmod = "2026-07-10";
const seoBlockPattern = /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;

const routes = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    lastmod: "2026-09-08",
    title:
      "AeroVision | Estudio de producto en Guatemala \u2014 Apps, cine a\u00e9reo e impresi\u00f3n 3D",
    description:
      "AeroVision es un estudio guatemalteco que construye y opera sus propios productos: PayCoach para iOS, cine a\u00e9reo con drones e impresi\u00f3n 3D bajo pedido.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/aerovision-logo.png`,
        description:
          "Estudio guatemalteco de producto: software, cine a\u00e9reo con drones e impresi\u00f3n 3D.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "GT",
        },
        sameAs: ["https://instagram.com/aerovision.gt", "https://paycoach.app"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: "es-GT",
      },
    ],
  },
  {
    path: "/products",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: "2026-09-08",
    title: "Productos | AeroVision \u2014 PayCoach, cine a\u00e9reo con drones e impresi\u00f3n 3D",
    description:
      "Los negocios que AeroVision construye y opera: PayCoach para iOS, el estudio de cine a\u00e9reo AeroVision Drones y el taller 3D Prints GT.",
  },
  {
    path: "/products/paycoach",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-09-08",
    title: "PayCoach | Asistencia y cobros para academias deportivas \u2014 App iOS y web",
    description:
      "PayCoach es la app de AeroVision para entrenadores: pasa asistencia sin se\u00f1al, calcula el cobro de cada alumno o familia y lo env\u00eda por WhatsApp. Gratis en el App Store.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PayCoach",
      applicationCategory: "EducationalApplication",
      operatingSystem: "iOS, Web",
      url: "https://paycoach.app",
      downloadUrl: "https://apps.apple.com/gt/app/paycoach/id6799230820?l=en-GB",
      author: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  },
  {
    path: "/portfolio",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: "2026-09-08",
    title: "Portafolio | AeroVision \u2014 Apps, sitios web y cine a\u00e9reo",
    description:
      "Proyectos dise\u00f1ados y publicados por AeroVision: PayCoach, AeroVision Drones, StraightUp, Darkline Coaching, Pawsome Walks, BaseCode y Business Forge.",
  },
  {
    path: "/drones",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2026-09-08",
    title: "AeroVision | Video Aéreo, Fotografía con Drone y FPV en Guatemala",
    description:
      "AeroVision crea video aéreo cinematográfico, fotografía con drone, tours FPV y contenido para bienes raíces, eventos, turismo y marcas en Guatemala.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: siteName,
        url: siteUrl,
        image: defaultImage,
        logo: `${siteUrl}/aerovision-logo.png`,
        description:
          "Estudio de cine aéreo y drones en Guatemala para bienes raíces, eventos, turismo, marcas y deportes de acción.",
        areaServed: {
          "@type": "Country",
          name: "Guatemala",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "GT",
        },
        telephone: "+50250889835",
        sameAs: ["https://instagram.com/aerovision.gt"],
        serviceType: [
          "Video aéreo cinematográfico",
          "Fotografía aérea",
          "Tours con drone",
          "Drone FPV para acción y deportes",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: "es-GT",
      },
    ],
  },
  {
    path: "/work/home",
    priority: "0.8",
    changefreq: "monthly",
    title: "Casas y Bienes Raíces con Drone en Guatemala | AeroVision",
    description:
      "Recorridos aéreos y fotos para propiedades en Guatemala. Mira el portfolio de AeroVision para casas, bienes raíces y tours con drone.",
  },
  {
    path: "/work/accion",
    priority: "0.8",
    changefreq: "monthly",
    title: "Acción con Drone FPV en Guatemala | AeroVision",
    description:
      "Tomas de acción rápidas e inmersivas para ciclismo, senderos y deportes. Portfolio de AeroVision con video FPV y edición cinematográfica.",
  },
  {
    path: "/work/sports",
    priority: "0.8",
    changefreq: "monthly",
    title: "Eventos y Deportes con Drone en Guatemala | AeroVision",
    description:
      "Cobertura aérea para eventos, días familiares y deportes en Guatemala. Mira ejemplos de AeroVision con edición rápida para redes.",
  },
  {
    path: "/work/group",
    priority: "0.8",
    changefreq: "monthly",
    title: "Grupos y Eventos con Drone en Guatemala | AeroVision",
    description:
      "Retratos grupales desde el aire y cobertura de eventos en Guatemala. Portfolio de AeroVision para material social y promocional.",
  },
  {
    path: "/work/tourism",
    priority: "0.8",
    changefreq: "monthly",
    title: "Turismo y Paisajes con Drone en Guatemala | AeroVision",
    description:
      "Video y fotografía aérea para turismo, costas, lagos y paisajes. Mira el portfolio de AeroVision para destinos y marcas de viaje.",
  },
  {
    path: "/terms-of-service",
    priority: "0.2",
    changefreq: "yearly",
    title: "Términos de Servicio | AeroVision Guatemala",
    description:
      "Consulta los términos de servicio de AeroVision.gt para reservas, pagos, cancelaciones, entrega de material y derechos de uso.",
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const canonicalFor = (routePath) => `${siteUrl}${routePath === "/" ? "/" : routePath}`;

const buildJsonLd = (route) => {
  if (route.jsonLd) return route.jsonLd;

  return {
    "@context": "https://schema.org",
    "@type": route.path.startsWith("/work/") ? "CollectionPage" : "WebPage",
    name: route.title,
    description: route.description,
    url: canonicalFor(route.path),
    inLanguage: "es-GT",
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
};

const jsonScript = (payload) =>
  `<script type="application/ld+json" data-seo-json>${JSON.stringify(payload).replaceAll(
    "</script",
    "<\\/script"
  )}</script>`;

const seoHead = (route) => {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const canonical = canonicalFor(route.path);

  return `<!-- SEO_HEAD_START -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#090b0f" />
    <meta name="author" content="${siteName}" />
    <link rel="canonical" href="${canonical}" />

    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale" content="es_GT" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${defaultImage}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${defaultImage}" />
    ${jsonScript(buildJsonLd(route))}
    <!-- SEO_HEAD_END -->`;
};

const routeOutputPath = (routePath) => {
  if (routePath === "/") return indexPath;
  return path.join(distDir, routePath.slice(1), "index.html");
};

const buildSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${canonicalFor(route.path)}</loc>
    <lastmod>${route.lastmod ?? defaultLastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const template = await readFile(indexPath, "utf8");

if (!seoBlockPattern.test(template)) {
  throw new Error("Could not find SEO_HEAD_START/SEO_HEAD_END block in dist/index.html");
}

await Promise.all(
  routes.map(async (route) => {
    const outputPath = routeOutputPath(route.path);
    const html = template.replace(seoBlockPattern, seoHead(route));

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  })
);

await writeFile(path.join(distDir, "sitemap.xml"), buildSitemap());

console.log(`Generated static SEO HTML for ${routes.length} routes.`);
