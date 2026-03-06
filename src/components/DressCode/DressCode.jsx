import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './DressCode.scss';

const GuideCard = ({ label, text, imageSrc }) => (
  <div className="dresscode__card">
    {imageSrc && (
      <div className="dresscode__card-img-wrap">
        <img src={imageSrc} alt={label} className="dresscode__card-img" loading="lazy" />
        <div className="dresscode__card-img-overlay" />
      </div>
    )}
    <div className="dresscode__card-body">
      <p className="dresscode__card-label">{label}</p>
      <p className="dresscode__card-text">{text}</p>
    </div>
  </div>
);

GuideCard.propTypes = {
  label:    PropTypes.string.isRequired,
  text:     PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};
GuideCard.defaultProps = { imageSrc: null };

const DressCode = () => {
  const {
    dressCodeStyle, dressCodeDescription,
    dressCodeWomen, dressCodeMen,
    dressCodePalette, imageDressCodeWomen, imageDressCodeMen,
  } = useTemplateData();
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

        <div className="dresscode__cards">
          <GuideCard label="Ellas" text={dressCodeWomen} imageSrc={imageDressCodeWomen} />
          <GuideCard label="Ellos" text={dressCodeMen}   imageSrc={imageDressCodeMen}  />
        </div>

        {dressCodePalette?.length > 0 && (
          <div className="dresscode__palette">
            {dressCodePalette.map(({ id, label, hex }) => (
              <div key={id} className="dresscode__swatch">
                <span className="dresscode__swatch-color" style={{ backgroundColor: hex }} />
                <span className="dresscode__swatch-label">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DressCode;
