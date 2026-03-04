import { useTemplateData } from '../../context/TemplateContext';
import './Hero.scss';

const Hero = () => {
  const { brideName, groomName, weddingDateDisplay, imageHero } = useTemplateData();

  return (
    <section id="hero" className="hero">
      {/* Left — photo */}
      <div className="hero__photo" aria-hidden="true">
        <img src={imageHero} alt="" className="hero__img" />
        <div className="hero__photo-overlay" />
      </div>

      {/* Right — content */}
      <div className="hero__content">
        <p className="hero__eyebrow">Os invitamos a nuestra boda</p>

        <div className="hero__names">
          <span className="hero__name">{brideName}</span>
          <span className="hero__amp">&amp;</span>
          <span className="hero__name">{groomName}</span>
        </div>

        <div className="hero__rule" aria-hidden="true" />

        <p className="hero__date">{weddingDateDisplay}</p>

        <a href="#rsvp" className="hero__cta">Confirmar asistencia</a>
      </div>
    </section>
  );
};

export default Hero;
