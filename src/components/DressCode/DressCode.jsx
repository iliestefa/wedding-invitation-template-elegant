import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './DressCode.scss';

const Swatch = ({ hex, label }) => (
  <div className="dresscode__swatch">
    <span className="dresscode__swatch-color" style={{ background: hex }} />
    <span className="dresscode__swatch-label">{label}</span>
  </div>
);

Swatch.propTypes = {
  hex:   PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const DressCode = () => {
  const { dressCodeStyle, dressCodeDescription, dressCodeWomen, dressCodeMen, dressCodePalette, imageDressCode } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="dresscode" className="dresscode">
      <div className="dresscode__inner">
        {/* Text column */}
        <div ref={ref} className="dresscode__text">
          <p className="dresscode__eyebrow">Vestimenta</p>
          <h2 className="dresscode__style">{dressCodeStyle}</h2>
          <p className="dresscode__description">{dressCodeDescription}</p>

          <div className="dresscode__guide">
            <div className="dresscode__guide-item">
              <p className="dresscode__guide-label">Ellas</p>
              <p className="dresscode__guide-text">{dressCodeWomen}</p>
            </div>
            <div className="dresscode__guide-item">
              <p className="dresscode__guide-label">Ellos</p>
              <p className="dresscode__guide-text">{dressCodeMen}</p>
            </div>
          </div>

          <div className="dresscode__palette">
            {dressCodePalette.map((color) => (
              <Swatch key={color.id} hex={color.hex} label={color.label} />
            ))}
          </div>
        </div>

        {/* Image column */}
        {imageDressCode && (
          <div className="dresscode__image-wrap">
            <img src={imageDressCode} alt="Código de vestimenta" className="dresscode__image" />
          </div>
        )}
      </div>
    </section>
  );
};

export default DressCode;
