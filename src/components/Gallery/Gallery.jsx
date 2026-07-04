import { useCallback, useEffect, useState } from "react";
import { useTemplateData } from "../../context/TemplateContext";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import "./Gallery.scss";

const Gallery = () => {
  const { galleryImages } = useTemplateData();
  const ref = useIntersectionObserver();
  const [lightbox, setLightbox] = useState(null); // índice de la foto abierta o null

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

        <div className="gallery__grid-wrap">
          <div className="gallery__grid">
            {galleryImages.map((src, i) => (
              <button
                key={src}
                type="button"
                className="gallery__item"
                onClick={() => setLightbox(i)}
                aria-label={`Ver foto ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Kristel y Jose Luis — foto ${i + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
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
            alt={`Kristel y Jose Luis — foto ${lightbox + 1}`}
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
