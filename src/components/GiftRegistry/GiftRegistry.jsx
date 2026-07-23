import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './GiftRegistry.scss';

// navigator.clipboard solo existe en contextos seguros (HTTPS / localhost);
// al acceder por IP local se usa el fallback con execCommand.
const copyToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const AccountCard = ({ ownerName, bankName, accountType, cbu, accountNumberLabel, ci, email }) => {
  const [copiedField, setCopiedField] = useState(null);
  const timeoutRef = useRef(null);

  const handleCopy = async (field, text) => {
    try {
      await copyToClipboard(text);
      setCopiedField(field);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedField(null), 1800);
    } catch {
      setCopiedField(null);
    }
  };

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
            <button className="gift__card-value" onClick={() => handleCopy('cbu', cbu)} title="Copiar número">
              {copiedField === 'cbu' ? 'Copiado ✓' : cbu}
            </button>
          </div>
        )}
        {ci && (
          <div className="gift__card-row">
            <span className="gift__card-key">CI</span>
            <button className="gift__card-value" onClick={() => handleCopy('ci', ci)} title="Copiar CI">
              {copiedField === 'ci' ? 'Copiado ✓' : ci}
            </button>
          </div>
        )}
        {email && (
          <div className="gift__card-row">
            <span className="gift__card-key">Correo</span>
            <button className="gift__card-value" onClick={() => handleCopy('email', email)} title="Copiar correo">
              {copiedField === 'email' ? 'Copiado ✓' : email}
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
  ci:                 PropTypes.string,
  email:              PropTypes.string,
};
AccountCard.defaultProps = {
  accountType: null,
  cbu: null,
  accountNumberLabel: 'N° de Cuenta',
  ci: null,
  email: null,
};

const GiftRegistry = () => {
  const { giftRegistryIntro, bankAccounts } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="gifts" className="gift">
      <div ref={ref} className="gift__inner">
        <div className="gift__text">
          <p className="gift__eyebrow">Cuentas para Regalo</p>
          <h2 className="gift__title">Un regalo de corazón</h2>
          {(Array.isArray(giftRegistryIntro) ? giftRegistryIntro : [giftRegistryIntro]).map((text) => (
            <p key={text} className="gift__intro">{text}</p>
          ))}
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
