import { useState, useEffect } from "react";

export function useScroll() {
  // const [navLoc, setNavLoc] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // const nav = document.querySelector(".menuContent"); 
      // if (nav) {
      //   setNavLoc(nav.getBoundingClientRect().top); 
      // }

      setScrollY(window.scrollY); 
    };

    // Run once initially
    handleScroll();

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollY;
}
