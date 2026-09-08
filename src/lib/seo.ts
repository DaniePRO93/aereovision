import { useEffect } from "react";

export const SITE_URL = "https://aerovision.gt";
export const SITE_NAME = "AeroVision";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

type JsonLd = Record<string, unknown>;

export interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  jsonLd?: JsonLd | JsonLd[];
}

const absoluteUrl = (value: string): string => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.content = content;
};

const setCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
};

const setJsonLd = (jsonLd?: JsonLd | JsonLd[]) => {
  document
    .querySelectorAll('script[type="application/ld+json"][data-seo-json]')
    .forEach((node) => node.remove());

  if (!jsonLd) return;

  const payloads = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  payloads.forEach((payload) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoJson = "true";
    script.text = JSON.stringify(payload);
    document.head.appendChild(script);
  });
};

export const usePageSeo = ({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  robots = "index, follow",
  jsonLd,
}: SeoConfig) => {
  useEffect(() => {
    const canonical = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);

    document.title = title;
    setCanonical(canonical);
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="robots"]', "name", "robots", robots);

    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMeta('meta[property="og:locale"]', "property", "og:locale", "es_GT");
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);

    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    setJsonLd(jsonLd);
  }, [description, image, jsonLd, path, robots, title, type]);
};

export const createHomeJsonLd = () => [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    logo: `${SITE_URL}/aerovision-logo.png`,
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
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es-GT",
  },
];
