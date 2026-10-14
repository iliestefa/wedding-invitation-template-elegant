import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTemplateData } from '../../context/TemplateContext';
import {
  GATEFOLD_TAP_HINT, GATEFOLD_OPEN_LABEL,
  GATEFOLD_ENTER_DELAY_MS, GATEFOLD_EXIT_MS,
} from '../../constants';
import sealSrc from '../../assets/gatefold/sello.png';
import './EntranceGatefold.scss';

const PANEL_SIDES = ['left', 'right'];

// Escena de entrada opcional (data.entranceAnimation): una carpeta oscura
// partida al centro con un sello de lacre. Al tocar el sello, las hojas se
// abren hacia los lados y detrás aparece la invitación.
//
// El sello es una foto en escala de grises fundida sobre un color plano, así
// que puede tomar cualquier color: por defecto el acento de la paleta, o el
// que la pareja elija (gatefoldSealColor). Igual con el papel (gatefoldColor).
//
// `contained`: para previews que no ocupan toda la ventana (el canvas del
// editor). La escena se posiciona dentro de su contenedor posicionado y
// bloquea el scroll de ese contenedor en vez del de <html>.
const GatefoldScene = ({ contained, paperColor, sealColor }) => {
  const sceneRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setEntered(true), GATEFOLD_ENTER_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  // Mientras la carpeta está en pantalla, la página no hace scroll.
  useEffect(() => {
    if (gone) return undefined;
    const scroller = contained ? sceneRef.current?.offsetParent : document.documentElement;
    if (!scroller) return undefined;
    const previous = scroller.style.overflow;
    scroller.scrollTop = 0;
    scroller.style.overflow = 'hidden';
    return () => {
      scroller.style.overflow = previous;
    };
  }, [contained, gone]);

  useEffect(() => {
    if (!opened) return undefined;
    const timeoutId = setTimeout(() => setGone(true), GATEFOLD_EXIT_MS);
    return () => clearTimeout(timeoutId);
  }, [opened]);

  if (gone) return null;

  const className = [
    'gatefold',
    contained ? 'gatefold--contained' : '',
    entered ? 'gatefold--entered' : '',
    opened ? 'gatefold--open' : '',
  ].join(' ').trim();

  const colorVars = {
    ...(paperColor ? { '--gatefold-paper': paperColor } : {}),
    ...(sealColor ? { '--gatefold-seal': sealColor } : {}),
  };

  return (
    <div ref={sceneRef} className={className} style={colorVars} aria-hidden={opened}>
      {PANEL_SIDES.map((side) => (
        <div key={side} className={`gatefold__panel gatefold__panel--${side}`}>
          <div className="gatefold__face">
            <div className="gatefold__paper">
              <span className="gatefold__edge" aria-hidden="true" />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="gatefold__seal"
        aria-label={GATEFOLD_OPEN_LABEL}
        onClick={() => setOpened(true)}
        disabled={opened}
      >
        <span className="gatefold__wax">
          <span
            className="gatefold__wax-tint"
            style={{ WebkitMaskImage: `url(${sealSrc})`, maskImage: `url(${sealSrc})` }}
          />
          <img className="gatefold__wax-img" src={sealSrc} alt="" aria-hidden="true" />
        </span>

        <svg className="gatefold__ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
          <defs>
            <path id="gatefold-arc" d="M100 24A76 76 0 0 1 100 176" />
          </defs>
          <text className="gatefold__ring-text">
            <textPath href="#gatefold-arc" startOffset="50%" textAnchor="middle">
              {GATEFOLD_TAP_HINT}
            </textPath>
          </text>
        </svg>
      </button>
    </div>
  );
};

GatefoldScene.propTypes = {
  contained:  PropTypes.bool.isRequired,
  paperColor: PropTypes.string,
  sealColor:  PropTypes.string,
};
GatefoldScene.defaultProps = { paperColor: null, sealColor: null };

const EntranceGatefold = ({ contained }) => {
  const { entranceAnimation, gatefoldColor, gatefoldSealColor } = useTemplateData();
  if (!entranceAnimation) return null;
  return (
    <GatefoldScene contained={contained} paperColor={gatefoldColor} sealColor={gatefoldSealColor} />
  );
};

EntranceGatefold.propTypes = { contained: PropTypes.bool };
EntranceGatefold.defaultProps = { contained: false };

export default EntranceGatefold;
