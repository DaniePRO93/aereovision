// Constantes de contacto + generador de enlaces de WhatsApp.
export const WHATSAPP_NUMBER = "50250889835";
export const INSTAGRAM_URL = "https://instagram.com/aerovision.gt";

/** Construye un enlace wa.me con un mensaje pre-llenado y codificado. */
export const waLink = (text: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const waDirect = waLink(
  "¡Hola AeroVision! Me gustaría una cotización para una toma aérea."
);

export const customWaLink = waLink(
  "¡Hola AeroVision! Tengo un proyecto a medida en mente y quisiera una cotización personalizada. Esto es lo que necesito:"
);
