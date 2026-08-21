// ─── Pareja ───────────────────────────────────────────────────────────────────
export const BRIDE_NAME = "Nahime";
export const GROOM_NAME = "Fernando";
export const COUPLE_NAMES = `${BRIDE_NAME} & ${GROOM_NAME}`;

// ─── Fecha ────────────────────────────────────────────────────────────────────
export const WEDDING_DATE_ISO = "2026-10-25";
export const WEDDING_DATE_DISPLAY = "25 · 10 · 2026";
export const WEDDING_YEAR = "2026";

// ─── Recepción (evento único) ─────────────────────────────────────────────────
export const RECEPTION_TIME = "16:30 hrs";
export const RECEPTION_VENUE_NAME = "Club Biblos";
export const RECEPTION_VENUE_ADDRESS =
  "Km 2,5 de la vía a Samborondón, ingresando a la altura de la zona de la UEES y pasando por el sector de Puerta al Río";
export const RECEPTION_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Club+Biblos+Samborond%C3%B3n";
export const RECEPTION_MAPS_EMBED_SRC =
  "https://maps.google.com/maps?q=Club+Biblos+Samborond%C3%B3n&z=15&output=embed&hl=es";

// ─── Cronograma ───────────────────────────────────────────────────────────────
export const SCHEDULE_ITEMS = [
  {
    id: "recepcion",
    time: "16:30",
    label: "Recepción",
    detail: "Les esperamos en Club Biblos",
  },
  {
    id: "cena",
    time: "19:00",
    label: "Cena de gala",
    detail: "Salón principal.",
  },
  {
    id: "baile",
    time: "20:30",
    label: "Salida de los Novios",
    detail: "Gracias por Acompañarnos",
  },
];

// ─── Regalos ──────────────────────────────────────────────────────────────────
export const GIFT_REGISTRY_INTRO =
  "La mayor bendición para nosotros será compartir este día con ustedes. Si desean acompañarnos también con un obsequio, ponemos a su disposición nuestras cuentas bancarias. Agradecemos de todo corazón sus oraciones, cariño y generosidad.";

export const BANK_ACCOUNTS = [
  {
    id: "diorvett",
    ownerName: "Diorvett",
    bankName: "x",
    accountType: "x",
    accountAlias: "Diorvett",
    cbu: "x",
    accountNumberLabel: "N° de Cuenta",
  },
];

// ─── RSVP ─────────────────────────────────────────────────────────────────────
export const RSVP_DEADLINE = "10 de Octubre 2026";

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_MESSAGE = "Con amor, los esperamos.";

// ─── Imágenes ─────────────────────────────────────────────────────────────────
export const IMAGE_HERO = `${import.meta.env.BASE_URL}hero-desktop.jpeg`;
export const IMAGE_HERO_MOBILE = `${import.meta.env.BASE_URL}hero-mobile.jpeg`;

// ─── Galería ──────────────────────────────────────────────────────────────────
export const GALLERY_IMAGES = Array.from(
  { length: 30 },
  (_, i) => `${import.meta.env.BASE_URL}gallery/foto-${String(i + 1).padStart(2, "0")}.jpeg`
);
