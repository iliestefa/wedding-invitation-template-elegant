/**
 * Recibe los RSVP del formulario y los agrega como filas en la hoja de cálculo.
 *
 * Pasos para usarlo:
 *  1. Abre tu Google Sheet → menú Extensiones → Apps Script.
 *  2. Borra el contenido por defecto y pega TODO este archivo.
 *  3. Si tu hoja (pestaña) no se llama "Confirmaciones", cambia SHEET_NAME abajo.
 *  4. Implementar → Nueva implementación → Tipo: "Aplicación web".
 *       - Ejecutar como: Yo (tu cuenta)
 *       - Quién tiene acceso: "Cualquier persona"
 *     Copia la URL .../exec y ponla en el .env como VITE_RSVP_ENDPOINT.
 *  5. La primera vez te pedirá autorizar el acceso a tu hoja: acéptalo.
 */

const SHEET_NAME = 'Confirmaciones';

// Encabezados de la hoja (orden de las columnas).
const HEADERS = [
  'Fecha',
  'Nombre',
  'Asistencia',
  'Tu acompañante',
  'Total confirmados',
  'Mensaje',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // El nombre es obligatorio: no registrar confirmaciones sin nombre.
    if (!data.fullName || !String(data.fullName).trim()) {
      return json_({ ok: false, error: 'missing-name' });
    }

    const sheet = getSheet_();

    const attending = data.attendance === 'yes';
    const companionComing = data.hasCompanion && attending && data.companionAttending === 'yes';
    // El invitado cuenta como 1; el acompañante suma otro si confirma.
    const totalGuests = attending ? 1 + (companionComing ? 1 : 0) : 0;

    sheet.appendRow([
      new Date(),
      data.fullName || '',
      attending ? 'Sí, asistiré' : 'No podré asistir',
      companionLabel_(data),
      totalGuests,
      data.message || '',
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Permite verificar en el navegador que la app está publicada.
function doGet() {
  return json_({ ok: true, service: 'RSVP', status: 'online' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  // Si está vacía, escribe los encabezados.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

// Texto de la columna "Tu acompañante".
//   — si el invitado no asiste o no tiene acompañante asignado (companion no estaba en la URL).
function companionLabel_(data) {
  if (data.attendance !== 'yes') return '—';
  if (!data.hasCompanion) return '—';
  return data.companionAttending === 'yes' ? 'Sí, vendrá conmigo' : 'Asistiré sin acompañante';
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
