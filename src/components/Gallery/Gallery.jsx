import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTemplateData } from "../../context/TemplateContext";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import "./Gallery.scss";

const AUTOSCROLL_SPEED = 26; // px/s
const MOBILE_BREAKPOINT = "(max-width: 600px)"; // debe calzar con $mobile en _mixins.scss

const useColumnCount = () => {
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(MOBILE_BREAKPOINT).matches ? 3 : 4,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT);
    const onChange = (e) => setCount(e.matches ? 3 : 4);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return count;
};

// reparte las fotos en N columnas (round-robin) conservando el índice
// global de cada una, para que el lightbox siga el orden real
const splitIntoColumns = (images, columns) => {
  const cols = Array.from({ length: columns }, () => []);
  images.forEach((src, i) => cols[i % columns].push({ src, index: i }));
  return cols;
};

// columna 0 y 2 suben (el contenido se desplaza hacia arriba),
// columna 1 baja — más dinámico que mover todo el bloque junto
const colDirection = (colIndex) => (colIndex % 2 === 0 ? -1 : 1);

const GalleryColumn = ({ photos, colIndex, coupleNames, onOpen }) => {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const dir = colDirection(colIndex);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    // arranque escalonado: cada columna empieza en un punto distinto del
    // recorrido para que no se muevan todas en sincronía (recalculado en
    // el próximo frame, cuando el layout ya tiene la altura real)
    let started = false;
    // el desplazamiento se acumula en esta variable propia, NO leyendo
    // track.scrollTop cada frame: scrollTop redondea a entero, y con
    // AUTOSCROLL_SPEED bajo el incremento por frame (~0.3px) se perdía
    // por truncamiento — el scroll quedaba congelado en 0 para siempre.
    let position = 0;

    let raf;
    let last = null;
    const step = (t) => {
      if (last === null) last = t;
      const dt = (t - last) / 1000;
      last = t;
      // el contenido está duplicado en el JSX; recorrida la primera mitad
      // se salta de vuelta al inicio sin corte visible (loop infinito).
      // se recalcula cada frame porque las imágenes lazy pueden cambiar
      // el alto real del track después del primer render.
      const half = track.scrollHeight / 2;
      if (half > 0) {
        if (!started) {
          started = true;
          position = dir === -1 ? (half / 3) * colIndex : half - (half / 3) * colIndex;
          track.scrollTop = position;
        } else if (pausedRef.current) {
          // mientras el usuario scrollea manualmente, seguimos su posición
          // real en vez de la nuestra, para no deshacer su gesto al reanudar
          position = track.scrollTop;
        } else {
          position += dir * AUTOSCROLL_SPEED * dt;
          if (position <= 0) position += half;
          if (position >= half) position -= half;
          track.scrollTop = position;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [dir, colIndex]);

  // el usuario puede scrollear libremente la columna; el auto-scroll se
  // reanuda solo cuando el mouse/dedo ya no está sobre ella
  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  return (
    <div
      ref={trackRef}
      className="gallery__col"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div className="gallery__col-track">
        {/* fotos duplicadas ×2 para poder loopear el scroll sin salto */}
        {[...photos, ...photos].map(({ src, index }, dupI) => (
          <button
            key={`${src}-${dupI}`}
            type="button"
            className="gallery__item"
            onClick={() => onOpen(index)}
            aria-label={`Ver foto ${index + 1}`}
          >
            <img
              src={src}
              alt={`${coupleNames} — foto ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

GalleryColumn.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }),
  ).isRequired,
  colIndex: PropTypes.number.isRequired,
  coupleNames: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const Gallery = () => {
  const { galleryImages, coupleNames } = useTemplateData();
  const ref = useIntersectionObserver();
  const [lightbox, setLightbox] = useState(null); // índice de la foto abierta o null
  const columnCount = useColumnCount(); // 3 en móvil, 4 en desktop

  const columns = useMemo(
    () => splitIntoColumns(galleryImages, columnCount),
    [galleryImages, columnCount],
  );

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null
          ? null
          : (i - 1 + galleryImages.length) % galleryImages.length,
      ),
    [galleryImages.length],
  );
  const next = useCallback(
    () =>
      setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length)),
    [galleryImages.length],
  );

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  if (!galleryImages?.length) return null;

  return (
    <section id="gallery" className="gallery">
      <div ref={ref} className="gallery__inner">
        <header className="gallery__header">
          <p className="gallery__eyebrow">Compromiso</p>
          <h2 className="gallery__title">Nuestros momentos</h2>
          <div className="gallery__gold-line" aria-hidden="true" />
        </header>

        <div className="gallery__columns">
          {columns.map((col, colIndex) => (
            <GalleryColumn
              key={colIndex}
              photos={col}
              colIndex={colIndex}
              coupleNames={coupleNames}
              onOpen={setLightbox}
            />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="gallery__lightbox"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="gallery__lb-close"
            onClick={close}
            aria-label="Cerrar"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery__lb-arrow gallery__lb-arrow--prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <img
            className="gallery__lb-img"
            src={galleryImages[lightbox]}
            alt={`${coupleNames} — foto ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="gallery__lb-arrow gallery__lb-arrow--next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
