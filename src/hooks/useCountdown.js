import { useState, useEffect } from 'react';
import { WEDDING_DATE_ISO, COUNTDOWN_INTERVAL_MS } from '../constants';
import { computeTimeRemaining } from '../utils/dateHelpers';

const useCountdown = (dateIso, time) => {
  const iso = dateIso || WEDDING_DATE_ISO;
  const t   = time || '17:00';

  const [timeLeft, setTimeLeft] = useState(() => computeTimeRemaining(new Date(`${iso}T${t}:00`)));

  useEffect(() => {
    const target = new Date(`${iso}T${t}:00`);
    setTimeLeft(computeTimeRemaining(target));

    const id = setInterval(() => setTimeLeft(computeTimeRemaining(target)), COUNTDOWN_INTERVAL_MS);
    return () => clearInterval(id);
  }, [iso, t]);

  return timeLeft;
};

export default useCountdown;
