import { useState, useEffect } from 'react';

const useOtpCountdown = (initialSeconds = 300) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isExpired: timeLeft === 0,
    setTimeLeft,
  };
};

export default useOtpCountdown;