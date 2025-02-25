import React from "react";
import { useResize } from "./hooks/useResize.js";
import { useScroll } from "./hooks/useScroll.js";

export const withHooksHOC = (Component) => {
  return (props) => {
    const isTablet = useResize();
    const isDesktop = useResize();
    const isWdDesktop = useResize();
    const scrollY = useScroll();
    const translateY = scrollY > 350 ? "60rem" : "0rem";
    const isScrolled = scrollY > 350; 
    const logoTranslateY = scrollY > 400 ? "47rem" : "0rem";
    const logoTranslateYNrw = scrollY > 400 ? "53rem" : "0rem";

    return <Component isTablet={isTablet} 
                      isDesktop={isDesktop}
                      isWdDesktop={isWdDesktop}
                      translateY={translateY} 
                      isScrolled={isScrolled}
                      logoTranslateY={logoTranslateY}
                      logoTranslateYNrw={logoTranslateYNrw}
                      {...props} />;
  };
};
