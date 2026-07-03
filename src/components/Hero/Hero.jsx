import { useTemplateData } from '../../context/TemplateContext';
import './Hero.scss';

// la J itálica de Playfair parece otra letra; se reemplaza solo ese glifo
// por la J de Cormorant Garamond, que sí se lee como J
const renderName = (name) =>
  name.split('').map((ch, i) =>
    ch === 'J' ? <span key={i} className="hero__name-j">{ch}</span> : ch
  );

const Hero = () => {
  const { brideName, groomName, weddingDateDisplay, imageHero } = useTemplateData();

  return (
    <section id="hero" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${imageHero})` }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">Los invitamos a celebrar</p>

        <div className="hero__names">
          <span className="hero__name hero__name--bride">{renderName(brideName)}</span>
          <span className="hero__amp">&</span>
          <span className="hero__name hero__name--groom">{renderName(groomName)}</span>
        </div>

        <div className="hero__divider">
          <span className="hero__divider-line" />
          <span className="hero__date">{weddingDateDisplay}</span>
          <span className="hero__divider-line" />
        </div>

        <a href="#rsvp" className="hero__cta">Confirmar asistencia</a>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
