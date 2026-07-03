// ─── Pareja ───────────────────────────────────────────────────────────────────
export const BRIDE_NAME = "Valeria";
export const GROOM_NAME = "Miguel";
export const COUPLE_NAMES = `${BRIDE_NAME} & ${GROOM_NAME}`;

// ─── Fecha ────────────────────────────────────────────────────────────────────
export const WEDDING_DATE_ISO     = "2026-07-04";
export const WEDDING_DATE_DISPLAY = "04 · 07 · 2026";
export const WEDDING_YEAR         = "2026";

// ─── Ceremonia ────────────────────────────────────────────────────────────────
export const CEREMONY_TIME           = "19:00 hrs";
export const CEREMONY_VENUE_NAME     = "Aeroclub del Ecuador";
export const CEREMONY_VENUE_ADDRESS  = "Av. de las Américas, diagonal a la gasolinera Terpel";
export const CEREMONY_MAPS_LINK      = "https://maps.google.com/?q=-2.164256,-79.891281";
export const CEREMONY_MAPS_EMBED_SRC = "https://maps.google.com/maps?q=-2.164256%2C-79.891281&output=embed&hl=es";

// ─── Recepción ────────────────────────────────────────────────────────────────
// Boda en un solo lugar: la recepción se realiza en el mismo Aeroclub.
// El panel de Recepción se oculta automáticamente cuando estos datos son "-".
export const RECEPTION_TIME           = "-";
export const RECEPTION_VENUE_NAME     = "-";
export const RECEPTION_VENUE_ADDRESS  = "-";
export const RECEPTION_MAPS_LINK      = "-";
export const RECEPTION_MAPS_EMBED_SRC = "-";

// ─── Cronograma ───────────────────────────────────────────────────────────────
export const SCHEDULE_ITEMS = [
  { id: "llegada",   time: "19:00", label: "Llegada",                                  detail: "La Bienvenida y Coctel de Apertura." },
  { id: "ceremonia", time: "19:30", label: "Ceremonia",                                detail: "Entrada de los novios, se llevará a cabo la emotiva ceremonia civil, donde los novios celebrarán su unión con la lectura de actas por parte del juez." },
  { id: "fotos",     time: "20:20", label: "Sesión de Fotos",                          detail: "Disfrutarán de una breve sesión de fotos junto a familiares y amigos." },
  { id: "recepcion", time: "20:50", label: "Baile de los Novios",                      detail: "Entrada oficial de los recién casados. Seguidamente, pasan a la pista para su primer baile como esposos." },
  { id: "cena",      time: "21:05", label: "Brindis y Palabras de Agradecimiento",     detail: "Se compartirán unas emotivas palabras de agradecimiento, seguidas del brindis oficial." },
  { id: "baile",     time: "21:20", label: "Apertura del Buffet y Cena",               detail: "Se dará inicio al buffet para que los invitados disfruten de una agradable cena." },
  { id: "fiesta",    time: "22:35", label: "La Fiesta",                  icon: "✨",    detail: "Apertura de la Pista de Baile. ¡A disfrutar!" },
];

// ─── Dress Code ───────────────────────────────────────────────────────────────
export const DRESS_CODE_STYLE       = "Black Tie Optional";
export const DRESS_CODE_DESCRIPTION = "Les pedimos acompañar la noche con elegancia. ¡Lo más importante es que se sientan cómodos y especiales para acompañarnos en este gran día!";
export const DRESS_CODE_WOMEN       = "";
export const DRESS_CODE_MEN         = "";

export const DRESS_CODE_PALETTE = [
  { id: "graphite",  label: "Grafito",   hex: "#3d3d3d" },
];

// ─── Regalos ──────────────────────────────────────────────────────────────────
export const GIFT_REGISTRY_INTRO = "¿El mejor regalo? ¡Nuestra luna de miel!\nAgradecemos de todo corazón su amable aportación económica.";

export const BANK_ACCOUNTS = [
  {
    id: "valeria",
    ownerName: "Valeria Silva Gallardo",
    bankName: "Banco Pichincha",
    accountType: "Cuenta de Ahorros",
    accountAlias: "0943782391",
    cbu: "2211300460",
    accountNumberLabel: "N° de Cuenta",
  },
  {
    id: "miguel",
    ownerName: "Miguel Gómez Castro",
    bankName: "Banco Pichincha",
    accountType: "Cuenta de Ahorros",
    accountAlias: "0931078133",
    cbu: "2201631113",
    accountNumberLabel: "N° de Cuenta",
  },
];

// ─── Nota adicional ───────────────────────────────────────────────────────────
export const EXTRA_NOTES = "Agradecemos su comprensión, nuestra celebración ha sido pensada exclusivamente para adultos.";

// ─── Footer ───────────────────────────────────────────────────────────────────
export const FOOTER_MESSAGE = "Nos llena de alegría contar contigo en este día tan importante para nosotros. ¡Gracias por acompañarnos!";

// ─── Imágenes ─────────────────────────────────────────────────────────────────
export const IMAGE_HERO              = "https://i.postimg.cc/1zRyZhXL/SDIM0773.jpg";
export const IMAGE_HERO_MOBILE       = "https://i.postimg.cc/BQDSTBdX/SDIM0804.jpg";
export const IMAGE_CEREMONY          = "https://images.unsplash.com/photo-1606216840721-aeb5c80ad67e?w=900&q=80&auto=format&fit=crop";
export const IMAGE_DRESSCODE_WOMEN   = "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=90&auto=format&fit=crop";
export const IMAGE_DRESSCODE_MEN     = "https://i.postimg.cc/zXvGb9Sb/pexels-drewrae-883362.jpg";
