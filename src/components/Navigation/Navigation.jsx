import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import './Navigation.scss';

const NAV_LINKS = [
  { href: '#countdown', label: 'Fecha' },
  { href: '#gallery',   label: 'Fotos' },
  { href: '#events',    label: 'Lugares' },
  { href: '#schedule',  label: 'Programa' },
  { href: '#dresscode', label: 'Vestimenta' },
  { href: '#gifts',     label: 'Regalos' },
];

const Navigation = ({ forceScrolled }) => {
  const { brideName, groomName } = useTemplateData();
  const [windowScrolled, setWindowScrolled] = useState(false);

  useEffect(() => {
    if (forceScrolled !== undefined) return;
    const update = () => setWindowScrolled(window.scrollY > 60);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [forceScrolled]);

  const scrolled = forceScrolled !== undefined ? forceScrolled : windowScrolled;

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Navegación principal">
      <a href="#hero" className="nav__brand">
        {groomName}
        <span className="nav__brand-amp"> & </span>
        {brideName}
      </a>

      <ul className="nav__links">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className="nav__link">{label}</a>
          </li>
        ))}
      </ul>

      <a href="#rsvp" className="nav__cta">Confirmar</a>
    </nav>
  );
};

Navigation.propTypes = { forceScrolled: PropTypes.bool };
Navigation.defaultProps = { forceScrolled: undefined };

export default Navigation;
