import { useCallback, useRef } from 'react';
import { REVEAL_THRESHOLD, REVEAL_ROOT_MARGIN } from '../constants';

// Callback ref (no ref clásico + useEffect): si el nodo cambia después del
// primer montaje —p. ej. en el editor, al cambiar el tipo de RSVP se monta
// otra variante de la sección— el elemento nuevo también se observa. Con el
// patrón anterior solo se observaba el nodo inicial y el reemplazo quedaba
// invisible (opacity 0 de .reveal-ready sin .is-visible).
const useIntersectionObserver = (options = {}) => {
  const observerRef = useRef(null);

  const elementRef = useCallback(
    (element) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            observer.unobserve(element);
          }
        },
        {
          threshold: options.threshold ?? REVEAL_THRESHOLD,
          rootMargin: options.rootMargin ?? REVEAL_ROOT_MARGIN,
        }
      );

      observer.observe(element);
      observerRef.current = observer;
    },
    [options.threshold, options.rootMargin]
  );

  return elementRef;
};

export default useIntersectionObserver;
