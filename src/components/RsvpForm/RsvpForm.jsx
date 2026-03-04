import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './RsvpForm.scss';

const ATTENDANCE_OPTIONS = [
  { value: 'yes', label: 'Asistiré' },
  { value: 'no',  label: 'No podré asistir' },
];

const MEAL_OPTIONS = [
  { value: 'standard',   label: 'Estándar' },
  { value: 'vegetarian', label: 'Vegetariano' },
  { value: 'vegan',      label: 'Vegano' },
  { value: 'celiac',     label: 'Celíaco' },
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
  companions: '0',
  meal:       'standard',
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
    if (!rsvpEndpoint) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const res = await fetch(rsvpEndpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`${res.status}`);
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
              <p className="rsvp__success-text">¡Gracias! Recibimos tu confirmación.</p>
            </div>
          ) : (
            <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
              <FloatingField id="fullName" label="Nombre completo" value={form.fullName} onChange={setField('fullName')} required />

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

              {isAttending && (
                <>
                  <FloatingField id="companions" label="Acompañantes (sin contarte a ti)" type="number" value={form.companions} onChange={setField('companions')} />
                  <fieldset className="rsvp__radio-group">
                    <legend className="rsvp__radio-legend">Menú preferido</legend>
                    <div className="rsvp__radio-options rsvp__radio-options--meal">
                      {MEAL_OPTIONS.map(({ value, label }) => (
                        <label key={value} className={`rsvp__radio-label ${form.meal === value ? 'rsvp__radio-label--active' : ''}`}>
                          <input type="radio" name="meal" value={value} checked={form.meal === value} onChange={() => setField('meal')(value)} className="rsvp__radio-input" />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
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
