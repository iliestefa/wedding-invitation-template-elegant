import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './RsvpForm.scss';

const getOrdenParam = () => new URLSearchParams(window.location.search).get('orden') ?? '';

// En modo 'limited' cada cupo tiene su propio link: ?cupos=N
const getCupoParam = () => {
  const raw = new URLSearchParams(window.location.search).get('cupos');
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 ? n : null;
};

const buildWhatsappUrl = (number, message) => {
  const digits = (number || '').replace(/\D/g, '');
  // Sin número configurado: WhatsApp genérico — abre el selector de contacto
  // con el mensaje ya escrito, y el invitado elige a quién enviárselo.
  if (!digits) return `https://wa.me/?text=${encodeURIComponent(message)}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

const ATTENDANCE_OPTIONS = [
  { value: 'yes', label: 'Asistiré' },
  { value: 'no',  label: 'No podré asistir' },
];

const FloatingField = ({ id, label, type = 'text', value, onChange, required, readOnly, min, max }) => (
  <div className="rsvp__field">
    <input
      id={id}
      type={type}
      className="rsvp__input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      readOnly={readOnly}
      min={min}
      max={max}
      placeholder=" "
    />
    <label htmlFor={id} className="rsvp__label">{label}</label>
  </div>
);

FloatingField.propTypes = {
  id:       PropTypes.string.isRequired,
  label:    PropTypes.string.isRequired,
  type:     PropTypes.string,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  min:      PropTypes.string,
  max:      PropTypes.string,
};
FloatingField.defaultProps = {
  type: 'text', required: false, readOnly: false, min: undefined, max: undefined,
};

const RsvpForm = () => {
  const {
    coupleNames,
    rsvpDeadline,
    rsvpEndpoint,
    rsvpType,
    rsvpWhatsapp,
    rsvpCompanionsMode,
    rsvpCupos,
    rsvpQuestions,
    weddingSlug,
  } = useTemplateData();
  const ref = useIntersectionObserver();

  const type = rsvpType ?? 'sheets';
  const questions = rsvpQuestions ?? [];

  // Máximo de acompañantes según el cupo del link (null = sin límite)
  const companionsMax = useMemo(() => {
    if (type !== 'sheets' || rsvpCompanionsMode !== 'limited') return null;
    const available = rsvpCupos?.length ? rsvpCupos : [0, 1, 2];
    const param = getCupoParam();
    return param !== null && available.includes(param) ? param : Math.max(...available);
  }, [type, rsvpCompanionsMode, rsvpCupos]);

  const [fullName, setFullName]     = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [companions, setCompanions] = useState('0');
  const [answers, setAnswers]       = useState({});
  const [status, setStatus]         = useState('idle');

  const setAnswer = (id) => (value) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleCompanions = (value) => {
    if (companionsMax !== null && Number(value) > companionsMax) {
      setCompanions(String(companionsMax));
      return;
    }
    setCompanions(value);
  };

  const isAttending = attendance === 'yes';

  // Modo WhatsApp: sin formulario, dos botones directos (Sí / No) que abren
  // WhatsApp con un mensaje corto ya armado — no hay datos que recolectar acá.
  const handleWhatsappChoice = (attending) => {
    const message = attending
      ? `¡Hola! Confirmo que SÍ asistiré a la boda de ${coupleNames}. 🎉`
      : `Hola, les escribo para confirmar que lamentablemente NO podré asistir a la boda de ${coupleNames}.`;
    const url = buildWhatsappUrl(rsvpWhatsapp, message);
    if (!url) { setStatus('error'); return; }
    window.open(url, '_blank', 'noopener');
    setStatus('success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceLabel =
      ATTENDANCE_OPTIONS.find((o) => o.value === attendance)?.label ?? attendance;
    const answeredQuestions = questions
      .map((q) => ({ label: q.label, value: (answers[q.id] ?? '').trim() }))
      .filter((q) => q.value);

    if (!rsvpEndpoint) { setStatus('error'); return; }
    setStatus('sending');
    try {
      // Formato del RSVP universal: el slug identifica al cliente y
      // questionLabels define las columnas dinámicas de su hoja. El body
      // va como text/plain porque application/json dispara un preflight
      // CORS que Apps Script no responde.
      const res = await fetch(rsvpEndpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          slug: weddingSlug,
          template: 'elegant',
          coupleNames,
          questionLabels: questions.map((q) => q.label),
          guestName: fullName,
          attendance,
          attendanceDetail: attendanceLabel,
          companions,
          // acompañantes NO incluye al invitado en esta plantilla → +1
          totalGuests: isAttending ? Number(companions) + 1 : 0,
          cupo:  companionsMax ?? '',
          answers: {
            // columna extra solo para clientes que usan links por invitado
            ...(getOrdenParam() ? { Orden: getOrdenParam() } : {}),
            ...Object.fromEntries(answeredQuestions.map((q) => [q.label, q.value])),
          },
        }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="rsvp" className="rsvp">
      <div ref={ref} className="rsvp__inner">
        <div className="rsvp__side">
          <p className="rsvp__eyebrow">Confirmación</p>
          <h2 className="rsvp__title">¿Nos acompañas?</h2>
          <p className="rsvp__deadline">
            Confirma antes del<br />
            <strong>{rsvpDeadline}</strong>
          </p>
          <div className="rsvp__gold-line" aria-hidden="true" />
        </div>

        <div className="rsvp__form-wrap">
          {status === 'success' ? (
            <div className="rsvp__success">
              <span className="rsvp__success-icon" aria-hidden="true">✓</span>
              <p className="rsvp__success-text">
                {type === 'whatsapp'
                  ? '¡Gracias! Termina de enviar el mensaje en WhatsApp para que nos llegue.'
                  : '¡Hemos recibido tu confirmación! Gracias por acompañarnos en este día tan especial.'}
              </p>
            </div>
          ) : type === 'whatsapp' ? (
            <div className="rsvp__whatsapp-choice">
              <button
                type="button"
                className="rsvp__whatsapp-btn rsvp__whatsapp-btn--yes"
                onClick={() => handleWhatsappChoice(true)}
              >
                Sí, asistiré
              </button>
              <button
                type="button"
                className="rsvp__whatsapp-btn rsvp__whatsapp-btn--no"
                onClick={() => handleWhatsappChoice(false)}
              >
                No podré asistir
              </button>
            </div>
          ) : (
            <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
              <FloatingField
                id="fullName"
                label="Nombre completo"
                value={fullName}
                onChange={setFullName}
                required
              />

              <fieldset className="rsvp__radio-group">
                <legend className="rsvp__radio-legend">Asistencia</legend>
                <div className="rsvp__radio-options">
                  {ATTENDANCE_OPTIONS.map(({ value, label }) => (
                    <label key={value} className={`rsvp__radio-label ${attendance === value ? 'rsvp__radio-label--active' : ''}`}>
                      <input type="radio" name="attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} className="rsvp__radio-input" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {isAttending && (
                <>
                  <FloatingField
                    id="companions"
                    label={companionsMax !== null
                      ? `Acompañantes (máximo ${companionsMax})`
                      : 'Acompañantes (sin contarte a ti)'}
                    type="number"
                    value={companions}
                    onChange={handleCompanions}
                    min="0"
                    max={companionsMax !== null ? String(companionsMax) : undefined}
                  />

                  {questions.filter((q) => q.type !== 'textarea').map((q) => (
                    <FloatingField
                      key={q.id}
                      id={`question-${q.id}`}
                      label={q.label}
                      value={answers[q.id] ?? ''}
                      onChange={setAnswer(q.id)}
                    />
                  ))}
                </>
              )}

              {questions.filter((q) => q.type === 'textarea').map((q) => (
                <div key={q.id} className="rsvp__field rsvp__field--textarea">
                  <textarea
                    id={`question-${q.id}`}
                    className="rsvp__textarea"
                    rows={3}
                    value={answers[q.id] ?? ''}
                    onChange={(e) => setAnswer(q.id)(e.target.value)}
                    placeholder=" "
                  />
                  <label htmlFor={`question-${q.id}`} className="rsvp__label">{q.label}</label>
                </div>
              ))}

              {status === 'error' && (
                <p className="rsvp__error">Algo salió mal. Por favor intentá de nuevo.</p>
              )}

              <button type="submit" className="rsvp__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Confirmar asistencia'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;
