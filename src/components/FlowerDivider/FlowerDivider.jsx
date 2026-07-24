import { useTemplateData } from '../../context/TemplateContext';
import './FlowerDivider.scss';

// guirnalda floral montada sobre el borde entre dos secciones (solo móvil):
// se coloca en App.jsx entre las dos secciones que separa
const FlowerDivider = () => {
  const { imageFloralDivider } = useTemplateData();
  if (!imageFloralDivider) return null;

  return (
    <div className="flower-divider" aria-hidden="true">
      <img
        className="flower-divider__img"
        src={imageFloralDivider}
        alt=""
        loading="lazy"
      />
    </div>
  );
};

export default FlowerDivider;
