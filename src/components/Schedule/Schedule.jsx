import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Schedule.scss';

const ScheduleRow = ({ time, label, detail, index }) => {
  const ref = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className="schedule__row"
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <span className="schedule__time">{time}</span>
      <span className="schedule__dot" aria-hidden="true" />
      <div className="schedule__info">
        <p className="schedule__label">{label}</p>
        {detail && <p className="schedule__detail">{detail}</p>}
      </div>
    </div>
  );
};

ScheduleRow.propTypes = {
  time:   PropTypes.string.isRequired,
  label:  PropTypes.string.isRequired,
  detail: PropTypes.string,
  index:  PropTypes.number.isRequired,
};
ScheduleRow.defaultProps = { detail: null };

const Schedule = () => {
  const { scheduleItems } = useTemplateData();

  return (
    <section id="schedule" className="schedule">
      <div className="schedule__inner">
        <header className="schedule__header">
          <p className="schedule__eyebrow">El día</p>
          <h2 className="schedule__title">Cronograma</h2>
        </header>

        <div className="schedule__list">
          {scheduleItems.map((item, i) => (
            <ScheduleRow
              key={item.id}
              time={item.time}
              label={item.label}
              detail={item.detail}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
