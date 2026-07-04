import { useTemplateData } from '../../context/TemplateContext';
import './Hero.scss';

// la J itálica de Playfair parece otra letra; se reemplaza solo ese glifo
// por la J de Cormorant Garamond, que sí se lee como J
const renderName = (name) =>
  name.split('').map((ch, i) =>
    ch === 'J' ? <span key={i} className="hero__name-j">{ch}</span> : ch
  );

const Hero = () => {
  const { brideName, groomName, weddingDateDisplay, imageHero, imageHeroMobile } = useTemplateData();

  return (
    <section id="hero" className="hero">
      <div
        className="hero__bg"
        style={{
          // URL absoluta: las rutas relativas dentro de variables CSS se
          // resuelven contra la carpeta del CSS compilado (/assets/) en
          // producción y la imagen daba 404 — solo en el build, no en dev
          '--hero-bg-desktop': `url(${new URL(imageHero, document.baseURI).href})`,
          '--hero-bg-mobile': `url(${new URL(imageHeroMobile ?? imageHero, document.baseURI).href})`,
        }}
      />
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
