// Central contact constants + WhatsApp deep-link builder.
export const WHATSAPP_NUMBER = "50250889835";
export const INSTAGRAM_URL = "https://instagram.com/aerovision.gt";

/** Build a wa.me link with a pre-filled, URL-encoded message. */
export const waLink = (text: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const waDirect = waLink(
  "Hi AeroVision! I'd like a quote for an aerial shoot."
);

export const customWaLink = waLink(
  "Hi AeroVision! I have a custom project in mind and I'd like a tailored quote. Here's what I need:"
);
