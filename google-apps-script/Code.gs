/**
 * Recibe los RSVP del formulario y los agrega como filas en la hoja de cálculo.
 * Adaptado al diseño de la hoja de Kristel & Jose Luis:
 *
 *   fila 7 → encabezados: Fecha | Nombre | Asistentes | Menu | Mensaje
 *   fila 8 en adelante → confirmaciones (una por fila)
 *
 * "Asistentes" = total de personas (invitado + acompañantes); 0 si no asiste.
 * El contador "Invitados Confirmados" de arriba puede ser =SUMA(C8:C).
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

// Etiquetas legibles para la columna Menu.
const MEAL_LABELS = {
  standard:   'Estándar',
  vegetarian: 'Vegetariano',
  vegan:      'Vegano',
  celiac:     'Celíaco',
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // El nombre es obligatorio: no registrar confirmaciones sin nombre.
    if (!data.fullName || !String(data.fullName).trim()) {
      return json_({ ok: false, error: 'missing-name' });
    }

    const sheet = getSheet_();

    const attending = data.attendance === 'yes';
    // Acompañantes solo cuentan si asiste; se sanea el número y se limita
    // al tope absoluto (invitación quíntuple = 4 acompañantes, 5 personas).
    const companions = attending
      ? Math.min(4, Math.max(0, parseInt(data.companions, 10) || 0))
      : 0;
    // Asistentes = el invitado (1) + sus acompañantes; 0 si no asiste.
    const totalGuests = attending ? 1 + companions : 0;

    // Columnas: Fecha | Nombre | Asistentes | Menu | Mensaje
    sheet.appendRow([
      new Date(),
      String(data.fullName).trim(),
      totalGuests,
      attending ? (MEAL_LABELS[data.meal] || data.meal || '') : '—',
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
