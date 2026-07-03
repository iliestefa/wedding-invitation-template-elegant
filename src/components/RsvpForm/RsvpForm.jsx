import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './RsvpForm.scss';

const getOrdenParam = () => new URLSearchParams(window.location.search).get('orden') ?? '';

// ?companion=true habilita la pregunta del acompañante; false o ausente la oculta.
const allowsCompanion = () => new URLSearchParams(window.location.search).get('companion') === 'true';

const ATTENDANCE_OPTIONS = [
  { value: 'yes', label: 'Sí, asistiré' },
  { value: 'no',  label: 'No podré asistir' },
];

const COMPANION_OPTIONS = [
  { value: 'yes', label: 'Sí, vendrá conmigo' },
  { value: 'no',  label: 'Asistiré sin acompañante' },
];

const FloatingField = ({ id, label, type = 'text', value, onChange, required }) => (
  <div className="rsvp__field">
    <input
      id={id}
      type={type}
      className="rsvp__input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
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
};
FloatingField.defaultProps = { type: 'text', required: false };

const INITIAL_STATE = {
  fullName:           '',

  attendance:         'yes',
  companionAttending: 'yes',
  message:            '',
};

const RsvpForm = () => {
  const { rsvpEndpoint, extraNotes } = useTemplateData();
  const ref = useIntersectionObserver();

  const [hasCompanion] = useState(allowsCompanion);
  const [form, setForm]     = useState(INITIAL_STATE);
  const [status, setStatus] = useState('idle');

  const setField = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // El nombre es obligatorio: no permitir enviar vacío o solo con espacios.
    if (!form.fullName.trim()) { setStatus('missing-name'); return; }
    if (!rsvpEndpoint) { setStatus('error'); return; }
    setStatus('sending');
    try {
      // text/plain evita el preflight CORS (OPTIONS) que Google Apps Script no maneja.
      // Apps Script lee el cuerpo igual desde e.postData.contents y lo parsea como JSON.
      await fetch(rsvpEndpoint, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body:    JSON.stringify({
          ...form,
          orden: getOrdenParam(),
          hasCompanion,
          // Solo aplica si el invitado tiene acompañante asignado y confirma su asistencia.
          companions: hasCompanion && isAttending && form.companionAttending === 'yes' ? 1 : 0,
        }),
      });
      // Con mode:'no-cors' la respuesta es opaca (no se puede leer res.ok); si el fetch
      // no lanzó, asumimos éxito. Apps Script registra la fila igualmente.
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const isAttending = form.attendance === 'yes';

  return (
    <section id="rsvp" className="rsvp">
      <div ref={ref} className="rsvp__inner">
        <div className="rsvp__side">
          <p className="rsvp__eyebrow">Confirmación</p>
          <h2 className="rsvp__title">¿Nos acompañas?</h2>
          {extraNotes && (
            <p className="rsvp__note">{extraNotes}</p>
          )}
        </div>

        <div className="rsvp__form-wrap">
          {status === 'success' ? (
            <div className="rsvp__success">
              <span className="rsvp__success-icon" aria-hidden="true">✓</span>
              <p className="rsvp__success-text">¡Gracias! Recibimos tu confirmación.</p>
            </div>
          ) : (
            <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
              <FloatingField
                id="fullName"
                label="Nombre completo"
                value={form.fullName}
                onChange={(value) => { setField('fullName')(value); if (status === 'missing-name') setStatus('idle'); }}
                required
              />
              {status === 'missing-name' && (
                <p className="rsvp__error">Por favor escribe tu nombre para confirmar.</p>
              )}

              <fieldset className="rsvp__radio-group">
                <legend className="rsvp__radio-legend">Asistencia</legend>
                <div className="rsvp__radio-options">
                  {ATTENDANCE_OPTIONS.map(({ value, label }) => (
                    <label key={value} className={`rsvp__radio-label ${form.attendance === value ? 'rsvp__radio-label--active' : ''}`}>
                      <input type="radio" name="attendance" value={value} checked={form.attendance === value} onChange={() => setField('attendance')(value)} className="rsvp__radio-input" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {isAttending && hasCompanion && (
                <fieldset className="rsvp__radio-group">
                  <legend className="rsvp__radio-legend">Tu acompañante</legend>
                  <div className="rsvp__radio-options">
                    {COMPANION_OPTIONS.map(({ value, label }) => (
                      <label key={value} className={`rsvp__radio-label ${form.companionAttending === value ? 'rsvp__radio-label--active' : ''}`}>
                        <input type="radio" name="companionAttending" value={value} checked={form.companionAttending === value} onChange={() => setField('companionAttending')(value)} className="rsvp__radio-input" />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="rsvp__field rsvp__field--textarea">
                <textarea id="message" className="rsvp__textarea" rows={3} value={form.message} onChange={(e) => setField('message')(e.target.value)} placeholder=" " />
                <label htmlFor="message" className="rsvp__label">Mensaje (opcional)</label>
              </div>

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
