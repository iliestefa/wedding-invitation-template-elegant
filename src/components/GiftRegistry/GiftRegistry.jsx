import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './GiftRegistry.scss';

const AccountCard = ({ ownerName, bankName, accountType, accountAlias, cbu, accountNumberLabel }) => {
  const handleCopy = (text) => navigator.clipboard?.writeText(text);

  return (
    <div className="gift__card">
      <div className="gift__card-header">
        <p className="gift__card-owner">{ownerName}</p>
        <p className="gift__card-bank">{bankName} · {accountType}</p>
      </div>
      <div className="gift__card-rows">
        {accountAlias && (
          <div className="gift__card-row">
            <span className="gift__card-key">Identificación</span>
            <button className="gift__card-value" onClick={() => handleCopy(accountAlias)} title="Copiar identificación">
              {accountAlias}
            </button>
          </div>
        )}
        {cbu && (
          <div className="gift__card-row">
            <span className="gift__card-key">{accountNumberLabel ?? 'CBU'}</span>
            <button className="gift__card-value" onClick={() => handleCopy(cbu)} title="Copiar número">
              {cbu}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  ownerName:          PropTypes.string.isRequired,
  bankName:           PropTypes.string.isRequired,
  accountType:        PropTypes.string.isRequired,
  accountAlias:       PropTypes.string,
  cbu:                PropTypes.string,
  accountNumberLabel: PropTypes.string,
};
AccountCard.defaultProps = { accountAlias: null, cbu: null, accountNumberLabel: 'N° de Cuenta' };

const GiftRegistry = () => {
  const { giftsEyebrow, giftsTitle, giftRegistryIntro, bankAccounts, imageGifts } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="gifts" className="gift">
      <div ref={ref} className="gift__inner">
        <div className="gift__text">
          {giftsEyebrow && <p className="gift__eyebrow">{giftsEyebrow}</p>}
          {giftsTitle && <h2 className="gift__title">{giftsTitle}</h2>}
          <p className="gift__intro">{giftRegistryIntro}</p>
        </div>

        {bankAccounts.length > 0 && (
          <div className="gift__accounts">
            {bankAccounts.map((account) => (
              <AccountCard key={account.id} {...account} />
            ))}
          </div>
        )}

        {imageGifts && (
          <div className="gift__image-wrap">
            <img src={imageGifts} alt="" className="gift__image" loading="lazy" />
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftRegistry;
