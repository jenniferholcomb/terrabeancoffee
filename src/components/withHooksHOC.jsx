import React from "react";
import { useResize } from "./hooks/useResize.js";
import { useScroll } from "./hooks/useScroll.js";

export const withHooksHOC = (Component) => {
  return (props) => {
    const { isTablet, isDesktop, isWdDesktop } = useResize();
    const scrollY = useScroll();
    const translateY = scrollY > 350 ? "62rem" : "0rem";
    const translateYNrw = scrollY > 350 ? "55rem" : "0rem";
    const isScrolled = scrollY > 350; 
    const logoTranslateY = scrollY > 400 ? "49rem" : "0rem";
    const logoTranslateYNrw = scrollY > 400 ? "50.5rem" : "0rem";

    return <Component isTablet={isTablet} 
                      isDesktop={isDesktop}
                      isWdDesktop={isWdDesktop}
                      translateY={translateY} 
                      translateYNrw={translateYNrw}
                      isScrolled={isScrolled}
                      logoTranslateY={logoTranslateY}
                      logoTranslateYNrw={logoTranslateYNrw}
                      {...props} />;
  };
};
