import { useState, useEffect } from 'react';
import { useTemplateData } from '../../context/TemplateContext';
import './Navigation.scss';

const NAV_LINKS = [
  { id: 'nav-eventos',    href: '#events',    label: 'Eventos' },
  { id: 'nav-cronograma', href: '#schedule',  label: 'Cronograma' },
  { id: 'nav-vestimenta', href: '#dresscode', label: 'Vestimenta' },
  { id: 'nav-regalos',    href: '#gifts',     label: 'Regalos' },
  { id: 'nav-rsvp',       href: '#rsvp',      label: 'RSVP' },
];

const Navigation = () => {
  const { brideName, groomName } = useTemplateData();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  const navLinks = NAV_LINKS.map(({ id, href, label }) => (
    <li key={id} className="nav__item">
      <a href={href} className="nav__link" onClick={handleLinkClick}>{label}</a>
    </li>
  ));

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#hero" className="nav__brand" aria-label="Inicio">
          <span className="nav__initials">{brideName[0]}</span>
          <span className="nav__sep">&</span>
          <span className="nav__initials">{groomName[0]}</span>
        </a>

        <nav className="nav__desktop" aria-label="Navegación principal">
          <ul className="nav__list">{navLinks}</ul>
        </nav>

        <button
          className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </div>

      <nav className={`nav__mobile ${menuOpen ? 'nav__mobile--open' : ''}`} aria-label="Menú móvil">
        <ul className="nav__mobile-list">{navLinks}</ul>
      </nav>
    </header>
  );
};

export default Navigation;
