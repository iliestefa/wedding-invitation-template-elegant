import { useTemplateData } from '../../context/TemplateContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './DressCode.scss';

const DressCode = () => {
  const {
    dressCodeStyle, dressCodeDescription,
    dressCodeWomen, dressCodeMen,
    dressCodePalette, imageDressCode,
  } = useTemplateData();
  const ref = useIntersectionObserver();

  return (
    <section id="dresscode" className="dresscode">
      <div className="dresscode__photo-strip">
        <img src={imageDressCode} alt="Dress code inspiration" className="dresscode__photo" />
        <div className="dresscode__photo-overlay" />
        <div className="dresscode__photo-label">
          <p className="dresscode__photo-eyebrow">Vestimenta</p>
          <h2 className="dresscode__photo-style">{dressCodeStyle}</h2>
        </div>
      </div>

      <div ref={ref} className="dresscode__body">
        <div className="dresscode__inner">
          <p className="dresscode__description">{dressCodeDescription}</p>

          <div className="dresscode__guides">
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
            {dressCodePalette.map(({ id, label, hex }) => (
              <div key={id} className="dresscode__swatch">
                <span
                  className="dresscode__swatch-color"
                  style={{ backgroundColor: hex }}
                />
                <span className="dresscode__swatch-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
