import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useCountdown from '../../hooks/useCountdown';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Countdown.scss';

const CountdownUnit = ({ value, label }) => (
  <div className="countdown__unit">
    <span className="countdown__number">{String(value).padStart(2, '0')}</span>
    <span className="countdown__label">{label}</span>
  </div>
);

CountdownUnit.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

const Countdown = () => {
  const { weddingDateIso, weddingDateDisplay, weddingYear, weddingTime } = useTemplateData();
  const { days, hours, minutes, seconds } = useCountdown(weddingDateIso, weddingTime);
  const ref = useIntersectionObserver();

  return (
    <section id="countdown" className="countdown">
      <div className="countdown__bg-text" aria-hidden="true">{weddingYear}</div>
      <div ref={ref} className="countdown__inner">
        <p className="countdown__eyebrow">La cuenta regresiva</p>
        <h2 className="countdown__title">{weddingDateDisplay}</h2>

        <div className="countdown__units">
          <CountdownUnit value={days}    label="Días" />
          <span className="countdown__sep" aria-hidden="true">·</span>
          <CountdownUnit value={hours}   label="Horas" />
          <span className="countdown__sep" aria-hidden="true">·</span>
          <CountdownUnit value={minutes} label="Minutos" />
          <span className="countdown__sep" aria-hidden="true">·</span>
          <CountdownUnit value={seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
