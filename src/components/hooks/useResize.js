import { useState, useEffect } from "react";

export function useResize() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTabletPor, setIsTabletPor] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isWdDesktop, setIsWdDesktop] = useState(false);
  const [innerHeight, setInnerHeight] = useState(null);
  const [orientation, setOrientation] = useState(null);

  const handleResize = () => {
    if (window.innerWidth < window.innerHeight) {
      setOrientation('portrait')
    } else {
      setOrientation('landscape')
    }

    if (window.innerWidth < 700) {
      setIsWdDesktop(false);
      setIsDesktop(false);
      setIsTablet(false);
      setIsTabletPor(false);
      setIsMobile(true);
    } else if (window.innerWidth < 1024) {
      setIsWdDesktop(false);
      setIsDesktop(false);
      setIsTablet(false);
      setIsTabletPor(true);
      setIsMobile(false);
    } else if (window.innerWidth < 1270) {
      setIsWdDesktop(false);
      setIsDesktop(false);
      setIsTablet(true);
      setIsTabletPor(false);
      setIsMobile(false);
    } else if (window.innerWidth < 1500 && window.innerWidth >= 1270) {
      setIsWdDesktop(false);
      setIsDesktop(true);
      setIsTablet(false);
      setIsTabletPor(false);
      setIsMobile(false);
    } else if (window.innerWidth >= 1500) {
      setIsWdDesktop(true);
      setIsDesktop(false);
      setIsTablet(false);
      setIsTabletPor(false);
      setIsMobile(false);
    }
  };

  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    setInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    setVh();

    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', setVh);
    };
  }, []); 
  
  return { isMobile, isTabletPor, isTablet, isDesktop, isWdDesktop, innerHeight, orientation };
}
