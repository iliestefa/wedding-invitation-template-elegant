import PropTypes from "prop-types";
import { useTemplateData } from "../../context/TemplateContext";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import "./Schedule.scss";

const ScheduleRow = ({ time, label, detail, isLast }) => (
  <div className={`schedule__row${isLast ? " schedule__row--last" : ""}`}>
    <span className="schedule__time">{time}</span>
    <div className="schedule__track">
      <span className="schedule__dot" />
      {!isLast && <span className="schedule__line" />}
    </div>
    <div className="schedule__info">
      <p className="schedule__label">{label}</p>
      {detail && <p className="schedule__detail">{detail}</p>}
    </div>
  </div>
);

ScheduleRow.propTypes = {
  time: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  detail: PropTypes.string,
  isLast: PropTypes.bool,
};
ScheduleRow.defaultProps = { detail: null, isLast: false };

const Schedule = () => {
  const { scheduleItems } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="schedule" className="schedule">
      <div ref={ref} className="schedule__inner">
        <header className="schedule__header">
          <p className="schedule__eyebrow">Programa</p>
          <h2 className="schedule__title">Nuestro día, momento a momento</h2>
        </header>

        <div className="schedule__list">
          {scheduleItems.map((item, idx) => (
            <ScheduleRow
              key={item.id}
              {...item}
              isLast={idx === scheduleItems.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
