// ─── RSVP universal ───────────────────────────────────────────────────────────
// UN solo Web App de Apps Script recibe las confirmaciones de TODOS los
// clientes (ver wedding-editor/apps-script/README.md). Cada invitación envía
// su WEDDING_SLUG y la hoja de respuestas se crea sola en Drive.
// Pega aquí la URL del deployment universal (termina en /exec); se puede
// sobreescribir por cliente con VITE_RSVP_ENDPOINT si hiciera falta.
export const RSVP_ENDPOINT =
  import.meta.env.VITE_RSVP_ENDPOINT ??
  'https://script.google.com/macros/s/AKfycbx4GAW6Lub9UvuDB3DOb1Y01wMiuWA1Q_5RfAw18WZH2rwu5yYzq93zw9dnbVAvb8BA4A/exec';
