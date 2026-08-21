import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  BRIDE_NAME, GROOM_NAME, COUPLE_NAMES,
  WEDDING_DATE_ISO, WEDDING_DATE_DISPLAY, WEDDING_YEAR,
  RECEPTION_TIME, RECEPTION_VENUE_NAME, RECEPTION_VENUE_ADDRESS,
  RECEPTION_MAPS_LINK, RECEPTION_MAPS_EMBED_SRC,
  SCHEDULE_ITEMS,
  GIFT_REGISTRY_INTRO, BANK_ACCOUNTS,
  RSVP_DEADLINE, RSVP_ENDPOINT,
  FOOTER_MESSAGE,
  IMAGE_HERO, IMAGE_HERO_MOBILE,
  GALLERY_IMAGES,
} from '../constants';

const defaultData = {
  brideName: BRIDE_NAME,
  groomName: GROOM_NAME,
  coupleNames: COUPLE_NAMES,
  weddingDateIso: WEDDING_DATE_ISO,
  weddingDateDisplay: WEDDING_DATE_DISPLAY,
  weddingYear: WEDDING_YEAR,
  receptionTime: RECEPTION_TIME,
  receptionVenueName: RECEPTION_VENUE_NAME,
  receptionVenueAddress: RECEPTION_VENUE_ADDRESS,
  receptionMapsLink: RECEPTION_MAPS_LINK,
  receptionMapsEmbedSrc: RECEPTION_MAPS_EMBED_SRC,
  scheduleItems: SCHEDULE_ITEMS,
  giftRegistryIntro: GIFT_REGISTRY_INTRO,
  bankAccounts: BANK_ACCOUNTS,
  rsvpDeadline: RSVP_DEADLINE,
  rsvpEndpoint: RSVP_ENDPOINT,
  footerMessage: FOOTER_MESSAGE,
  imageHero: IMAGE_HERO,
  imageHeroMobile: IMAGE_HERO_MOBILE,
  galleryImages: GALLERY_IMAGES,
};

const TemplateContext = createContext(defaultData);

export const TemplateProvider = ({ data, children }) => (
  <TemplateContext.Provider value={{ ...defaultData, ...data }}>
    {children}
  </TemplateContext.Provider>
);

TemplateProvider.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node.isRequired,
};

TemplateProvider.defaultProps = { data: {} };

export const useTemplateData = () => useContext(TemplateContext);
