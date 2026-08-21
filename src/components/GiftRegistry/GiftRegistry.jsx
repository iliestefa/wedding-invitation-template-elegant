import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './GiftRegistry.scss';

const GiftRegistry = () => {
  const { giftRegistryIntro } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="gifts" className="gift">
      <div ref={ref} className="gift__inner gift__inner--centered">
        <div className="gift__text">
          <p className="gift__eyebrow">Regalos</p>
          <h2 className="gift__title">Un regalo de corazón</h2>
          <p className="gift__intro">{giftRegistryIntro}</p>
        </div>
      </div>
    </section>
  );
};

export default GiftRegistry;
