import { useState, useEffect } from 'react';

const getDeviceType = (width) => {
  return {
    isMobile: width <= 768,
    isTablet: width > 768 && width <= 1024,
    isDesktop: width > 1024,
  };
};

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
}
