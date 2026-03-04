export const computeTimeRemaining = (targetDate) => {
  const totalSeconds = Math.max(0, Math.floor((targetDate - Date.now()) / 1000));

  if (totalSeconds === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days:    Math.floor(totalSeconds / 86400),
    hours:   Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
  };
};

export const padTwo = (n) => String(n).padStart(2, '0');
