/**
 * Recibe los RSVP del formulario y los agrega como filas en la hoja de cálculo.
 * Adaptado al diseño de la hoja de Nahime & Fernando:
 *
 *   fila 7 → encabezados: Fecha | Nombre | Respuesta | Mensaje
 *   fila 8 en adelante → confirmaciones (una por fila)
 *
 * "Respuesta" = "Sí" o "No" según si el invitado asistirá.
 * El contador "Invitados Confirmados" de arriba puede ser
 * =CONTAR.SI(C8:C;"Sí").
 *
 * Pasos para usarlo:
 *  1. En tu Google Sheet → menú Extensiones → Apps Script.
 *  2. Borra el contenido por defecto y pega TODO este archivo.
 *  3. Si tu pestaña no es la primera del archivo, escribe su nombre en SHEET_NAME.
 *  4. Implementar → Nueva implementación → Tipo: "Aplicación web".
 *       - Ejecutar como: Yo (tu cuenta)
 *       - Quién tiene acceso: "Cualquier persona"
 *     Copia la URL .../exec y ponla en el .env como VITE_RSVP_ENDPOINT.
 *  5. La primera vez te pedirá autorizar el acceso a tu hoja: acéptalo.
 *  6. Vuelve a compilar la web (npm run build) y redespliega.
 */

// Nombre de la pestaña. Vacío ('') = usa la primera pestaña del archivo.
const SHEET_NAME = '';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // El nombre es obligatorio: no registrar confirmaciones sin nombre.
    if (!data.fullName || !String(data.fullName).trim()) {
      return json_({ ok: false, error: 'missing-name' });
    }

    const sheet = getSheet_();
    const attending = data.attendance === 'yes';

    // Columnas: Fecha | Nombre | Respuesta | Mensaje
    sheet.appendRow([
      new Date(),
      String(data.fullName).trim(),
      attending ? 'Sí' : 'No',
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
  if (SHEET_NAME) {
    const byName = ss.getSheetByName(SHEET_NAME);
    if (byName) return byName;
  }
  return ss.getSheets()[0];
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
