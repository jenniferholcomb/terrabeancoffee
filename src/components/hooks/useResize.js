import { useState, useEffect, useRef } from "react";

export function useResize() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTabletPor, setIsTabletPor] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isWdDesktop, setIsWdDesktop] = useState(false);
  const [innerHeight, setInnerHeight] = useState(null);
  const initialInnerHeight = useRef(null);
  const [isDesktopBrowser, setIsDesktopBrowser] = useState(null);
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
    setInnerHeight(vh);
  };

  // const setVh1 = () => {
  //   console.log(initialInnerHeight.current)
  //   console.log(isDesktopBrowser)
  //   if (initialInnerHeight.current === null) {
  //     document.documentElement.style.setProperty('--vh1', `${window.innerHeight * 0.01}px`);
  //     initialInnerHeight.current = window.innerHeight * 0.01;
  //   } else if (isDesktopBrowser.current) {
  //     document.documentElement.style.setProperty('--vh1', `${window.innerHeight * 0.01}px`);        
  //   } else {
  //     document.documentElement.style.setProperty('--vh1', `${initialInnerHeight.current}px`);  
  //   }
  // }

  useEffect(() => {
    if (initialInnerHeight.current === null) {
      initialInnerHeight.current = innerHeight;
      document.documentElement.style.setProperty('--vh1', `${innerHeight}px`);
    } else if (isDesktopBrowser) {
      document.documentElement.style.setProperty('--vh1', `${innerHeight}px`);    
    } else {
      document.documentElement.style.setProperty('--vh1', `${initialInnerHeight.current}px`);  
    }
  }, [innerHeight]);

  useEffect(() => {
    handleResize();
    setVh();

    const userAgent = navigator.userAgent.toLowerCase();
    setIsDesktopBrowser(/(windows|macintosh|linux)/i.test(userAgent));

    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', setVh);
    };
  }, []); 
  
  return { isMobile, isTabletPor, isTablet, isDesktop, isWdDesktop, innerHeight, orientation };
}
