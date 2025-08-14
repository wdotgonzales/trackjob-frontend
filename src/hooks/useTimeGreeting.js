import { useState, useEffect } from "react";
import * as Localization from 'expo-localization';

const useTimeGreeting = () => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    // Get device timezone
    const deviceTimezone = Localization.timezone;
    setTimezone(deviceTimezone);

    const updateGreeting = () => {
      const now = new Date();
      setCurrentTime(now);
      
      // Get current hour in device's timezone
      const currentHour = now.getHours();
      
      let timeGreeting = '';
      
      if (currentHour >= 5 && currentHour < 12) {
        timeGreeting = 'Good Morning';
      } else if (currentHour >= 12 && currentHour < 17) {
        timeGreeting = 'Good Afternoon';
      } else {
        timeGreeting = 'Good Evening';
      }
      
      setGreeting(timeGreeting);
    };

    // Update greeting immediately
    updateGreeting();

    // Update every minute to keep greeting current
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    greeting,
    currentTime,
    timezone,
    // Utility function to get just the hour for additional usage
    currentHour: currentTime.getHours(),
  };
};

export default useTimeGreeting;