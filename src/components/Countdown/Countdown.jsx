import useCountdown from '../../hooks/useCountdown';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { padTwo } from '../../utils/dateHelpers';
import './Countdown.scss';

const CountdownUnit = ({ value, label }) => (
  <div className="countdown__unit">
    <span className="countdown__number">{padTwo(value)}</span>
    <span className="countdown__label">{label}</span>
  </div>
);

import PropTypes from 'prop-types';
CountdownUnit.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

const Countdown = () => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();
  const ref = useIntersectionObserver();

  if (isExpired) return null;

  return (
    <section id="countdown" className="countdown">
      <div ref={ref} className="countdown__inner">
        <p className="countdown__eyebrow">Faltan</p>
        <div className="countdown__units">
          <CountdownUnit value={days}    label="días" />
          <span className="countdown__sep" aria-hidden="true">:</span>
          <CountdownUnit value={hours}   label="horas" />
          <span className="countdown__sep" aria-hidden="true">:</span>
          <CountdownUnit value={minutes} label="min" />
          <span className="countdown__sep" aria-hidden="true">:</span>
          <CountdownUnit value={seconds} label="seg" />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
