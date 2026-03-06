import { useTemplateData } from '../../context/TemplateContext';
import './Footer.scss';

const Footer = () => {
  const { coupleNames, weddingYear, footerMessage } = useTemplateData();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__gold-line" aria-hidden="true" />
        <p className="footer__names">{coupleNames}</p>
        <p className="footer__year">{weddingYear}</p>
        <p className="footer__message">{footerMessage}</p>

        <p className="footer__credit">
          Diseñado con amor · <span className="footer__credit-brand">iliestefa</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
