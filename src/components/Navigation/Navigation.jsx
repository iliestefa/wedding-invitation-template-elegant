import { useState, useEffect } from 'react';
import { useTemplateData } from '../../context/TemplateContext';
import './Navigation.scss';

const NAV_LINKS = [
  { href: '#countdown', label: 'La Fecha' },
  { href: '#events',    label: 'Lugares' },
  { href: '#schedule',  label: 'Programa' },
  { href: '#dresscode', label: 'Vestimenta' },
  { href: '#gifts',     label: 'Regalos' },
];

const Navigation = () => {
  const { brideName, groomName } = useTemplateData();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Navegación principal">
      <a href="#hero" className="nav__brand">
        {brideName}
        <span className="nav__brand-amp">&</span>
        {groomName}
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

export default Navigation;
