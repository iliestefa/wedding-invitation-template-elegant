import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  BRIDE_NAME, GROOM_NAME, COUPLE_NAMES,
  WEDDING_DATE_ISO, WEDDING_DATE_DISPLAY, WEDDING_YEAR,
  CEREMONY_TIME, CEREMONY_VENUE_NAME, CEREMONY_VENUE_ADDRESS,
  CEREMONY_MAPS_LINK, CEREMONY_MAPS_EMBED_SRC,
  RECEPTION_TIME, RECEPTION_VENUE_NAME, RECEPTION_VENUE_ADDRESS,
  RECEPTION_MAPS_LINK, RECEPTION_MAPS_EMBED_SRC,
  SCHEDULE_ITEMS,
  DRESS_CODE_STYLE, DRESS_CODE_DESCRIPTION, DRESS_CODE_WOMEN, DRESS_CODE_MEN, DRESS_CODE_PALETTE,
  GIFT_REGISTRY_INTRO, BANK_ACCOUNTS,
  RSVP_DEADLINE,
  FOOTER_MESSAGE,
  IMAGE_HERO, IMAGE_CEREMONY, IMAGE_DRESSCODE,
} from '../constants';

const defaultData = {
  brideName: BRIDE_NAME,
  groomName: GROOM_NAME,
  coupleNames: COUPLE_NAMES,
  weddingDateIso: WEDDING_DATE_ISO,
  weddingDateDisplay: WEDDING_DATE_DISPLAY,
  weddingYear: WEDDING_YEAR,
  ceremonyTime: CEREMONY_TIME,
  ceremonyVenueName: CEREMONY_VENUE_NAME,
  ceremonyVenueAddress: CEREMONY_VENUE_ADDRESS,
  ceremonyMapsLink: CEREMONY_MAPS_LINK,
  ceremonyMapsEmbedSrc: CEREMONY_MAPS_EMBED_SRC,
  receptionTime: RECEPTION_TIME,
  receptionVenueName: RECEPTION_VENUE_NAME,
  receptionVenueAddress: RECEPTION_VENUE_ADDRESS,
  receptionMapsLink: RECEPTION_MAPS_LINK,
  receptionMapsEmbedSrc: RECEPTION_MAPS_EMBED_SRC,
  scheduleItems: SCHEDULE_ITEMS,
  dressCodeStyle: DRESS_CODE_STYLE,
  dressCodeDescription: DRESS_CODE_DESCRIPTION,
  dressCodeWomen: DRESS_CODE_WOMEN,
  dressCodeMen: DRESS_CODE_MEN,
  dressCodePalette: DRESS_CODE_PALETTE,
  giftRegistryIntro: GIFT_REGISTRY_INTRO,
  bankAccounts: BANK_ACCOUNTS,
  rsvpDeadline: RSVP_DEADLINE,
  footerMessage: FOOTER_MESSAGE,
  imageHero: IMAGE_HERO,
  imageCeremony: IMAGE_CEREMONY,
  imageDressCode: IMAGE_DRESSCODE,
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
