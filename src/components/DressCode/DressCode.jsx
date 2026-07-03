import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './DressCode.scss';

const DressCode = () => {
  const { dressCodeStyle, dressCodeDescription } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="dresscode" className="dresscode">
      <div ref={ref} className="dresscode__inner">

        <header className="dresscode__header">
          <p className="dresscode__eyebrow">Vestimenta</p>
          <h2 className="dresscode__style">{dressCodeStyle}</h2>
          <div className="dresscode__gold-line" aria-hidden="true" />
          <p className="dresscode__description">{dressCodeDescription}</p>
        </header>

      </div>
    </section>
  );
};

export default DressCode;
