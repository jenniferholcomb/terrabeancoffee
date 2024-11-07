import { useState, useEffect } from "react";

export function useResize() {
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 744) {
      setIsDesktop(false);
      setIsTablet(true);
    } else {
      setIsDesktop(true);
      setIsTablet(false);
    }
  };

  useEffect(() => {
    handleResize(); // Call it once to initialize state based on current window size
  }, []); // Empty dependency array to run on mount only

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 
  return isTablet;
}
