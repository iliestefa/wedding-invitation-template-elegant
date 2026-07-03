import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './GiftRegistry.scss';

const AccountCard = ({ ownerName, bankName, accountType, cbu, accountNumberLabel }) => {
  const handleCopy = (text) => navigator.clipboard?.writeText(text);

  return (
    <div className="gift__card">
      <div className="gift__card-header">
        <p className="gift__card-owner">{ownerName}</p>
        <p className="gift__card-bank">{bankName}</p>
      </div>
      <div className="gift__card-rows">
        {accountType && (
          <div className="gift__card-row">
            <span className="gift__card-key">Tipo de cuenta</span>
            <span className="gift__card-value gift__card-value--static">{accountType}</span>
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
  accountType:        PropTypes.string,
  cbu:                PropTypes.string,
  accountNumberLabel: PropTypes.string,
};
AccountCard.defaultProps = { accountType: null, cbu: null, accountNumberLabel: 'N° de Cuenta' };

const GiftRegistry = () => {
  const { giftRegistryIntro, bankAccounts } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="gifts" className="gift">
      <div ref={ref} className="gift__inner">
        <div className="gift__text">
          <p className="gift__eyebrow">Cuentas para Regalo</p>
          <h2 className="gift__title">Un regalo de corazón</h2>
          <p className="gift__intro">{giftRegistryIntro}</p>
        </div>

        <div className="gift__accounts">
          {bankAccounts.map((account) => (
            <AccountCard key={account.id} {...account} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftRegistry;
