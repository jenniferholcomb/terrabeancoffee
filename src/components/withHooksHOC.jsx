import React from "react";
import { useResize } from "./hooks/useResize.js";
import { useScroll } from "./hooks/useScroll.js";

export const withHooksHOC = (Component) => {
  return (props) => {
    const { isMobile, isTabletPor, isTablet, isDesktop, isWdDesktop, innerHeight, orientation } = useResize();
    const scrollY = useScroll();
    const translateY = scrollY > 300 ? "62rem" : "0rem";
    const translateYNrw = scrollY > 225 ? "55.5rem" : "0rem";
    const translateYTablet = scrollY > 150 ? "50.75rem" : "0rem";
    const translateYTabletPor = scrollY > 150 ? "57.5rem" : "0rem";
    const isScrolled = scrollY > 300; 
    const isScrolledNrw = scrollY > 225;
    const isScrolledTablet = scrollY > 150;
    const isScrolledTabletPor = scrollY > 75;
    const logoTranslateY = scrollY > 375 ? "49rem" : "0rem";
    const logoTranslateYNrw = scrollY > 300 ? "48rem" : "0rem";
    const logoTranslateYTablet = scrollY > 325 ? "45.5rem" : "0rem";
    const logoTranslateYTabletPor = scrollY > 325 ? "56.75rem" : "0rem";

    return <Component isMobile={isMobile}
                      isTabletPor={isTabletPor}
                      isTablet={isTablet} 
                      isDesktop={isDesktop}
                      isWdDesktop={isWdDesktop}
                      innerHeight={innerHeight}
                      translateY={translateY} 
                      translateYNrw={translateYNrw}
                      translateYTablet={translateYTablet}
                      translateYTabletPor={translateYTabletPor}
                      isScrolled={isScrolled}
                      isScrolledNrw={isScrolledNrw}
                      isScrolledTablet={isScrolledTablet}
                      isScrolledTabletPor={isScrolledTabletPor}
                      logoTranslateY={logoTranslateY}
                      logoTranslateYNrw={logoTranslateYNrw}
                      logoTranslateYTablet={logoTranslateYTablet}
                      logoTranslateYTabletPor={logoTranslateYTabletPor}
                      orientation={orientation}
                      {...props} />;
  };
};
