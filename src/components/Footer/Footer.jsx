import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import './Footer.scss';

const FooterLink = ({ href, children }) => (
  <a className="footer__nav-link" href={href}>{children}</a>
);
FooterLink.propTypes = { href: PropTypes.string.isRequired, children: PropTypes.node.isRequired };

const NAV_LINKS = [
  { href: '#hero',       label: 'Inicio' },
  { href: '#countdown',  label: 'La Fecha' },
  { href: '#events',     label: 'Lugares' },
  { href: '#schedule',   label: 'Cronograma' },
  { href: '#dresscode',  label: 'Vestimenta' },
  { href: '#gifts',      label: 'Regalos' },
  { href: '#rsvp',       label: 'Confirmar' },
];

const Footer = () => {
  const { coupleNames, weddingYear, footerMessage } = useTemplateData();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__names">{coupleNames}</p>
        <p className="footer__date">{weddingYear}</p>

        <nav className="footer__nav" aria-label="Navegación del pie">
          {NAV_LINKS.map(({ href, label }) => (
            <FooterLink key={href} href={href}>{label}</FooterLink>
          ))}
        </nav>

        <p className="footer__message">{footerMessage}</p>

        <hr className="footer__rule" />

        <p className="footer__credit">
          Diseñado con amor · <span className="footer__credit-brand">iliestefa</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
