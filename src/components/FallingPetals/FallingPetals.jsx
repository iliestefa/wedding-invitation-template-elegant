import { useEffect, useState } from 'react';
import './FallingPetals.scss';

// pétalos decorativos que caen suavemente por toda la web.
// cada gota (drop) cae en línea recta; el pétalo interior se balancea
// y gira — la combinación da la trayectoria ondulada natural.
// el color cambia según la sección visible (tema del jardín pastel).
const PETAL_COUNT = 6;

const SECTION_THEMES = {
  hero: 'rosa',
  countdown: 'rosa',
  gallery: 'rosa',
  events: 'salvia',
  schedule: 'celeste',
  dresscode: 'lila',
  gifts: 'menta',
  rsvp: 'durazno',
};

const FallingPetals = () => {
  const [theme, setTheme] = useState('rosa');

  useEffect(() => {
    const sections = Object.keys(SECTION_THEMES)
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // banda central del viewport: solo la sección "en foco" dispara el tema
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme(SECTION_THEMES[entry.target.id] ?? 'rosa');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`petals petals--${theme}`} aria-hidden="true">
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i} className="petals__drop">
          <span className="petals__petal" />
        </span>
      ))}
    </div>
  );
};

export default FallingPetals;
