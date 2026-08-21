import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Events.scss';

const Events = () => {
  const {
    receptionTime, receptionVenueName, receptionVenueAddress, receptionMapsLink, receptionMapsEmbedSrc,
  } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="events" className="events">
      <div ref={ref} className="events__inner">
        <header className="events__header">
          <p className="events__eyebrow">El gran día</p>
          <h2 className="events__title">Lugar & Hora</h2>
          <div className="events__gold-line" aria-hidden="true" />
        </header>

        <div className="events__venue">
          <p className="events__panel-time">{receptionTime}</p>
          <h3 className="events__panel-venue">{receptionVenueName}</h3>
          <p className="events__panel-address">{receptionVenueAddress}</p>
          {receptionMapsEmbedSrc && (
            <div className="events__map-wrap">
              <iframe
                className="events__map"
                src={receptionMapsEmbedSrc}
                title={`Mapa de ${receptionVenueName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
          {receptionMapsLink && (
            <a className="events__map-link" href={receptionMapsLink} target="_blank" rel="noopener noreferrer">
              Ver en Google Maps ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
