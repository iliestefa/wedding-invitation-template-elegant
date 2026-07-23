// ─── Pareja ───────────────────────────────────────────────────────────────────
export const BRIDE_NAME = "Kristel";
export const GROOM_NAME = "Jose Luis";
export const COUPLE_NAMES = `${BRIDE_NAME} & ${GROOM_NAME}`;

// ─── Fecha ────────────────────────────────────────────────────────────────────
export const WEDDING_DATE_ISO = "2026-09-26";
export const WEDDING_DATE_DISPLAY = "26 · 09 · 2026";
export const WEDDING_YEAR = "2026";

// ─── Ceremonia ────────────────────────────────────────────────────────────────
export const CEREMONY_TIME = "15:00 hrs";
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
    id: "ceremonia",
    time: "15:00",
    label: "Ceremonia Cristiana",
    detail:
      "Te esperamos en el Área Social La Romina para celebrar el inicio de nuestra nueva vida juntos.",
  },
  {
    id: "recepcion",
    time: "17:00",
    label: "Recepción",
    detail: "Compartamos la alegría de este día tan especial.",
  },
  {
    id: "fotos",
    time: "17:30",
    label: "Sesión fotográfica",
    detail: "Acompáñanos a capturar recuerdos inolvidables.",
  },
  {
    id: "cena",
    time: "19:00",
    label: "Cena",
    detail: "Disfrutemos juntos de una deliciosa velada.",
  },
  {
    id: "despedida",
    time: "20:30",
    label: "Despedida de los novios",
    detail: "Gracias por ser parte de este momento tan especial.",
  },
];

// ─── Dress Code ───────────────────────────────────────────────────────────────
export const DRESS_CODE_STYLE = "Black Tie Optional";
// cada elemento se muestra como un párrafo aparte
export const DRESS_CODE_DESCRIPTION = [
  "Nos hará mucha ilusión que nos acompañen con atuendos que reflejen la esencia de nuestra celebración, inspirados en tonos pastel y estampados florales.",
  "Con mucho cariño, les pedimos evitar prendas en blanco, marfil, crema y rojo, ya que estos colores estarán reservados para los protagonistas de este día tan especial.",
];
export const DRESS_CODE_WOMEN =
  "Vestido largo en tonos pastel o con estampado floral.";
export const DRESS_CODE_MEN =
  "Traje en tonos azul, gris, verde o colores oscuros, con camisa de vestir y corbata.";

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
// cada elemento se muestra como un párrafo aparte
export const GIFT_REGISTRY_INTRO = [
  "El mejor regalo para nosotros será compartir este día tan especial junto a ustedes y recibir su cariño en esta nueva etapa de nuestras vidas.",
  "Para quienes deseen acompañarnos con un detalle, hemos elegido la opción de una transferencia bancaria, que nos permitirá seguir construyendo nuestros sueños y nuestro hogar.",
  "Agradecemos de corazón su amor, sus buenos deseos y el privilegio de contar con su presencia en este momento tan importante de nuestra historia.",
];

export const BANK_ACCOUNTS = [
  {
    id: "kristel",
    ownerName: "Kristel Suárez",
    bankName: "Banco Pichincha",
    accountType: "Ahorros",
    cbu: "2205239007",
    accountNumberLabel: "N° de Cuenta",
    ci: "0950556530",
    email: "kristelsuarezr@gmail.com",
  },
  {
    id: "joseluis",
    ownerName: "José Guerra",
    bankName: "Banco Bolivariano",
    accountType: "Ahorros",
    cbu: "0951285272",
    accountNumberLabel: "N° de Cuenta",
    ci: "0930526694",
    email: "jguerrac1991@gmail.com",
  },
];

// ─── RSVP ─────────────────────────────────────────────────────────────────────
export const RSVP_DEADLINE = "15 de Agosto 2026";

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_MESSAGE = "Con amor, los esperamos.";

// ─── Imágenes ─────────────────────────────────────────────────────────────────
export const IMAGE_HERO = `${import.meta.env.BASE_URL}hero.webp`;
export const IMAGE_HERO_MOBILE = `${import.meta.env.BASE_URL}4.webp`;
export const IMAGE_CEREMONY =
  "https://images.unsplash.com/photo-1606216840721-aeb5c80ad67e?w=900&q=80&auto=format&fit=crop";
export const IMAGE_DRESSCODE_WOMEN = `${import.meta.env.BASE_URL}mujer.webp`;
export const IMAGE_DRESSCODE_MEN = `${import.meta.env.BASE_URL}hombre.webp`;

// ─── Galería ──────────────────────────────────────────────────────────────────
// orden del collage: la columna derecha baja 5, 7, 6
export const GALLERY_IMAGES = [1, 2, 3, 4, 5, 7, 6].map(
  (n) => `${import.meta.env.BASE_URL}${n}.webp`
);
