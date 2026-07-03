// ─── Pareja ───────────────────────────────────────────────────────────────────
export const BRIDE_NAME = "Kristel";
export const GROOM_NAME = "Jose Luis";
export const COUPLE_NAMES = `${BRIDE_NAME} & ${GROOM_NAME}`;

// ─── Fecha ────────────────────────────────────────────────────────────────────
export const WEDDING_DATE_ISO = "2026-09-26";
export const WEDDING_DATE_DISPLAY = "26 · 09 · 2026";
export const WEDDING_YEAR = "2026";

// ─── Ceremonia ────────────────────────────────────────────────────────────────
export const CEREMONY_TIME = "15:30 hrs";
export const CEREMONY_VENUE_NAME = "Bosque Aventura";
export const CEREMONY_VENUE_ADDRESS = "Km 33 Vía a La Costa";
export const CEREMONY_MAPS_LINK = "https://maps.app.goo.gl/7MpaWLyvjuxXQNYo6";
export const CEREMONY_MAPS_EMBED_SRC =
  "https://maps.google.com/maps?q=-2.2584458,-80.1493282&z=15&output=embed&hl=es";

// ─── Recepción ────────────────────────────────────────────────────────────────
export const RECEPTION_TIME = "17:00 hrs";
export const RECEPTION_VENUE_NAME = "Bosque Aventura";
export const RECEPTION_VENUE_ADDRESS = "Km 33 Vía a la Costa";
export const RECEPTION_MAPS_LINK = "https://maps.app.goo.gl/7MpaWLyvjuxXQNYo6";
export const RECEPTION_MAPS_EMBED_SRC =
  "https://maps.google.com/maps?q=-2.2584458,-80.1493282&z=15&output=embed&hl=es";

// ─── Cronograma ───────────────────────────────────────────────────────────────
export const SCHEDULE_ITEMS = [
  {
    id: "llegada",
    time: "15:30",
    label: "Ceremonia Cristiana",
    detail: "Les esperamos en la puerta del Area Social La Romina",
  },
  {
    id: "ceremonia",
    time: "17:00",
    label: "Recepción & Coctel",
    detail: "Área Social La Romina Bosque Aventura",
  },
  {
    id: "fotos",
    time: "17:30",
    label: "Sesión de fotos",
    detail: "Jardines La Romina",
  },
  {
    id: "recepcion",
    time: "18:00",
    label: "Celebración",
    detail: "Acompañanos a disfrutar con nosotros",
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

// ─── Dress Code ───────────────────────────────────────────────────────────────
export const DRESS_CODE_STYLE = "Black Tie Optional";
export const DRESS_CODE_DESCRIPTION =
  "Les pedimos acompañar la noche con elegancia. Tonos oscuros y neutros profundos. Por favor evitar el blanco.";
export const DRESS_CODE_WOMEN =
  "Vestido largo o de cóctel en negro, champagne, burdeos o azul noche.";
export const DRESS_CODE_MEN =
  "Traje oscuro o smoking. Negro, grafito, azul marino o burdeos.";

export const DRESS_CODE_PALETTE = [
  { id: "champagne", label: "Champagne", hex: "#e9f58e" },
  { id: "color-1783098996887", label: "Turquesa", hex: "#6deee5" },
  { id: "color-1783099007955", label: "Rosa pastel", hex: "#fcc5c5" },
  { id: "color-1783099028739", label: "Fucsia", hex: "#fd91ee" },
  { id: "color-1783099044323", label: "Verde menta", hex: "#9cf2a2" },
  { id: "color-1783099057399", label: "Gris perla", hex: "#ddd5d5" },
  { id: "color-1783099072211", label: "Azul índigo", hex: "#515890" },
  { id: "color-1783099095723", label: "Negro", hex: "#100e0e" },
];

// ─── Regalos ──────────────────────────────────────────────────────────────────
export const GIFT_REGISTRY_INTRO =
  "La mayor bendición para nosotros será compartir este día con ustedes. Si desean acompañarnos también con un obsequio, ponemos a su disposición nuestras cuentas bancarias. Agradecemos de todo corazón sus oraciones, cariño y generosidad.";

export const BANK_ACCOUNTS = [
  {
    id: "kristel",
    ownerName: "Kristel Suárez",
    bankName: "Banco Pichincha",
    accountType: "Ahorros",
    accountAlias: "Kristel",
    cbu: "2205239007",
    accountNumberLabel: "N° de Cuenta",
  },
  {
    id: "joseluis",
    ownerName: "Jose Luis Guerra",
    bankName: "Banco Bolivariano",
    accountType: "Ahorros",
    accountAlias: "Kristel",
    cbu: "99999999999", // TODO: reemplazar con el número real cuando lo envíe el cliente
    accountNumberLabel: "N° de Cuenta",
  },
];

// ─── RSVP ─────────────────────────────────────────────────────────────────────
export const RSVP_DEADLINE = "15 de Agosto 2026";

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_MESSAGE = "Con amor, los esperamos.";

// ─── Imágenes ─────────────────────────────────────────────────────────────────
export const IMAGE_HERO = `${import.meta.env.BASE_URL}hero.webp`;
export const IMAGE_CEREMONY =
  "https://images.unsplash.com/photo-1606216840721-aeb5c80ad67e?w=900&q=80&auto=format&fit=crop";
export const IMAGE_DRESSCODE_WOMEN = `${import.meta.env.BASE_URL}mujer.webp`;
export const IMAGE_DRESSCODE_MEN = `${import.meta.env.BASE_URL}hombre.webp`;
