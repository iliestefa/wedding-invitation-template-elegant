import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './RsvpForm.scss';

const getOrdenParam = () => new URLSearchParams(window.location.search).get('orden') ?? '';

const ATTENDANCE_OPTIONS = [
  { value: 'yes', label: 'Asistiré' },
  { value: 'no',  label: 'No podré asistir' },
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
  fullName:   '',
  attendance: 'yes',
  message:    '',
};

const RsvpForm = () => {
  const { rsvpDeadline, rsvpEndpoint } = useTemplateData();
  const ref = useIntersectionObserver();

  const [form, setForm]     = useState(INITIAL_STATE);
  const [status, setStatus] = useState('idle');

  const setField = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // sin nombre no se envía nada
    if (!form.fullName.trim()) { setStatus('missing-name'); return; }
    if (!rsvpEndpoint) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const res = await fetch(rsvpEndpoint, {
        method:  'POST',
        // text/plain evita el preflight CORS que Apps Script no responde;
        // el script parsea el JSON desde e.postData.contents igual
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body:    JSON.stringify({
          ...form,
          orden: getOrdenParam(),
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
              <p className="rsvp__success-text">¡Gracias! Recibimos tu respuesta.</p>
            </div>
          ) : (
            <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
              <FloatingField
                id="fullName"
                label="Nombre completo"
                value={form.fullName}
                onChange={(value) => {
                  setField('fullName')(value);
                  if (status === 'missing-name') setStatus('idle');
                }}
                required
              />

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

              <div className="rsvp__field rsvp__field--textarea">
                <textarea id="message" className="rsvp__textarea" rows={3} value={form.message} onChange={(e) => setField('message')(e.target.value)} placeholder=" " />
                <label htmlFor="message" className="rsvp__label">Mensaje (opcional)</label>
              </div>

              {status === 'missing-name' && (
                <p className="rsvp__error">Por favor escribe tu nombre para confirmar.</p>
              )}
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
