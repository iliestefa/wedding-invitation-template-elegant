import { useEffect, useRef, useState } from 'react';
import './MusicPlayer.scss';

const AUDIO_SRC = `${import.meta.env.BASE_URL}music.mp3`;

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    // true cuando este efecto ya se limpió (StrictMode monta el componente
    // dos veces en dev): un audio descartado jamás debe empezar a sonar
    let disposed = false;

    // los navegadores bloquean el autoplay con sonido: se intenta al cargar
    // y, si falla, se reintenta en cada interacción del invitado hasta que
    // el navegador lo permita (los listeners solo se quitan cuando ya suena)
    const INTERACTION_EVENTS = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'wheel', 'scroll'];

    const removeListeners = () => {
      INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, startOnInteraction));
    };

    const startOnInteraction = () => {
      if (disposed) {
        removeListeners();
        return;
      }
      audio.play().then(() => {
        if (disposed) { audio.pause(); return; }
        setPlaying(true);
        removeListeners();
      }).catch(() => {});
    };

    audio.play()
      .then(() => {
        if (disposed) { audio.pause(); return; }
        setPlaying(true);
      })
      .catch(() => {
        if (disposed) return;
        INTERACTION_EVENTS.forEach((ev) =>
          window.addEventListener(ev, startOnInteraction, { passive: true })
        );
      });

    return () => {
      disposed = true;
      audio.pause();
      audio.src = '';
      removeListeners();
    };
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className={`music ${playing ? 'music--playing' : ''}`}>
      {playing && (
        <span className="music__notes" aria-hidden="true">
          <span className="music__note">♪</span>
          <span className="music__note">♫</span>
          <span className="music__note">♪</span>
        </span>
      )}
      <button
        type="button"
        className="music__btn"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="7" y="6" width="3.5" height="12" rx="1" />
            <rect x="13.5" y="6" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8.5 5.8v12.4c0 .8.9 1.3 1.6.9l9.6-6.2c.6-.4.6-1.4 0-1.8L10.1 4.9c-.7-.4-1.6.1-1.6.9z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
