import { useState, useEffect, useRef } from "react";

export function useScroll() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollingDown, setScrollingDown] = useState(false);
  const prevScrollYRef = useRef(window.scrollY);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          const isScrollingDown = currentScrollY > prevScrollYRef.current;
          setScrollingDown(isScrollingDown);
          prevScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const initialScrollY = window.scrollY;
    if (initialScrollY !== 0) {
      setScrollingDown(initialScrollY > prevScrollYRef.current);
    } 

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollingDown };
}
