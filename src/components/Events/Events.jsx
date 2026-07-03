import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Events.scss';

const EventPanel = ({ eyebrow, time, venueName, venueAddress, mapsLink, mapsSrc }) => (
  <div className="events__panel">
    <p className="events__panel-eyebrow">{eyebrow}</p>
    <p className="events__panel-time">{time}</p>
    <h3 className="events__panel-venue">{venueName}</h3>
    <p className="events__panel-address">{venueAddress}</p>
    {mapsSrc && (
      <div className="events__map-wrap">
        <iframe
          className="events__map"
          src={mapsSrc}
          title={`Mapa de ${venueName}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    )}
    {mapsLink && (
      <a className="events__map-link" href={mapsLink} target="_blank" rel="noopener noreferrer">
        Ver en Google Maps ↗
      </a>
    )}
  </div>
);

EventPanel.propTypes = {
  eyebrow:      PropTypes.string.isRequired,
  time:         PropTypes.string.isRequired,
  venueName:    PropTypes.string.isRequired,
  venueAddress: PropTypes.string.isRequired,
  mapsLink:     PropTypes.string,
  mapsSrc:      PropTypes.string,
};
EventPanel.defaultProps = { mapsLink: null, mapsSrc: null };

const Events = () => {
  const {
    ceremonyTime, ceremonyVenueName, ceremonyVenueAddress, ceremonyMapsLink, ceremonyMapsEmbedSrc,
    receptionTime, receptionVenueName, receptionVenueAddress, receptionMapsLink, receptionMapsEmbedSrc,
  } = useTemplateData();
  const ref = useIntersectionObserver();

  const sameVenue = ceremonyVenueName === receptionVenueName;

  return (
    <section id="events" className="events">
      <div ref={ref} className="events__inner">
        <header className="events__header">
          <p className="events__eyebrow">El gran día</p>
          <h2 className="events__title">Lugar & Hora</h2>
          <div className="events__gold-line" aria-hidden="true" />
        </header>

        {sameVenue ? (
          <>
            <div className="events__grid events__grid--times">
              <div className="events__panel">
                <p className="events__panel-time">{ceremonyTime}</p>
                <p className="events__panel-eyebrow">Ceremonia</p>
              </div>
              <div className="events__divider" aria-hidden="true" />
              <div className="events__panel">
                <p className="events__panel-time">{receptionTime}</p>
                <p className="events__panel-eyebrow">Recepción</p>
              </div>
            </div>

            <div className="events__venue">
              <h3 className="events__panel-venue">{ceremonyVenueName}</h3>
              <p className="events__panel-address">{ceremonyVenueAddress}</p>
              {ceremonyMapsEmbedSrc && (
                <div className="events__map-wrap">
                  <iframe
                    className="events__map"
                    src={ceremonyMapsEmbedSrc}
                    title={`Mapa de ${ceremonyVenueName}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
              {ceremonyMapsLink && (
                <a className="events__map-link" href={ceremonyMapsLink} target="_blank" rel="noopener noreferrer">
                  Ver en Google Maps ↗
                </a>
              )}
            </div>
          </>
        ) : (
          <div className="events__grid">
            <EventPanel
              eyebrow="Ceremonia"
              time={ceremonyTime}
              venueName={ceremonyVenueName}
              venueAddress={ceremonyVenueAddress}
              mapsLink={ceremonyMapsLink}
              mapsSrc={ceremonyMapsEmbedSrc}
            />
            <div className="events__divider" aria-hidden="true" />
            <EventPanel
              eyebrow="Recepción"
              time={receptionTime}
              venueName={receptionVenueName}
              venueAddress={receptionVenueAddress}
              mapsLink={receptionMapsLink}
              mapsSrc={receptionMapsEmbedSrc}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
