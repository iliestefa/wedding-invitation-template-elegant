import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Events.scss';

const EventPanel = ({ eyebrow, time, venue, address, mapsLink, embedSrc, side }) => {
  const ref = useIntersectionObserver();
  return (
    <div ref={ref} className={`event-panel event-panel--${side}`}>
      <p className="event-panel__eyebrow">{eyebrow}</p>
      <p className="event-panel__time">{time}</p>
      <h3 className="event-panel__venue">{venue}</h3>
      <p className="event-panel__address">{address}</p>
      {embedSrc && (
        <div className="event-panel__map">
          <iframe
            src={embedSrc}
            title={`Mapa ${venue}`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
      {mapsLink && (
        <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="event-panel__cta">
          Ver en Google Maps
        </a>
      )}
    </div>
  );
};

import PropTypes from 'prop-types';
EventPanel.propTypes = {
  eyebrow:  PropTypes.string.isRequired,
  time:     PropTypes.string.isRequired,
  venue:    PropTypes.string.isRequired,
  address:  PropTypes.string.isRequired,
  mapsLink: PropTypes.string,
  embedSrc: PropTypes.string,
  side:     PropTypes.oneOf(['left', 'right']),
};
EventPanel.defaultProps = { mapsLink: null, embedSrc: null, side: 'left' };

const Events = () => {
  const {
    ceremonyTime, ceremonyVenueName, ceremonyVenueAddress,
    ceremonyMapsLink, ceremonyMapsEmbedSrc,
    receptionTime, receptionVenueName, receptionVenueAddress,
    receptionMapsLink, receptionMapsEmbedSrc,
  } = useTemplateData();

  return (
    <section id="events" className="events">
      <div className="events__grid">
        <EventPanel
          eyebrow="Ceremonia"
          time={ceremonyTime}
          venue={ceremonyVenueName}
          address={ceremonyVenueAddress}
          mapsLink={ceremonyMapsLink}
          embedSrc={ceremonyMapsEmbedSrc}
          side="left"
        />
        <div className="events__divider" aria-hidden="true" />
        <EventPanel
          eyebrow="Recepción"
          time={receptionTime}
          venue={receptionVenueName}
          address={receptionVenueAddress}
          mapsLink={receptionMapsLink}
          embedSrc={receptionMapsEmbedSrc}
          side="right"
        />
      </div>
    </section>
  );
};

export default Events;
