import { useState, useEffect } from "react";

export function useResize() {
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isWdDesktop, setIsWdDesktop] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1270) {
      setIsWdDesktop(false);
      setIsDesktop(false);
      setIsTablet(true);
    } else if (window.innerWidth < 1500 && window.innerWidth >= 1270) {
      setIsWdDesktop(false);
      setIsDesktop(true);
      setIsTablet(false);
    } else if (window.innerWidth >= 1500) {
      setIsWdDesktop(true);
      setIsDesktop(false);
      setIsTablet(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  
  return { isTablet, isDesktop, isWdDesktop };
}
