import React, { createRef, useRef } from "react";
import { useResize } from "./hooks/useResize.js";
import { useScroll } from "./hooks/useScroll.js";

export const withHooksHOC = (Component) => {
  return (props) => {
    const { isMobile, isTabletPor, isTablet, isDesktop, isWdDesktop, innerHeight, orientation } = useResize();
    const { scrollY, scrollingDown } = useScroll();

    const sectionsRef = useRef([]);

    if (sectionsRef.current.length === 0) {
      sectionsRef.current = Array.from({ length: 3 }, () => createRef());
    }

    const translateY = scrollY > 300 ? "62rem" : "0rem";
    const translateYNrw = scrollY > 225 ? "55.5rem" : "0rem";
    const translateYTablet = scrollY > 150 ? "50.75rem" : "0rem";
    const translateYTabletPor = scrollY > 150 ? "57.5rem" : "0rem";
    const translateYMobile = scrollY > 150 ? "51.8rem" : "0rem";
    const translateYMobileB = scrollY > 1060 ? "103rem" : "51.8rem";

    const isScrolled = scrollY > 300; 
    const isScrolledNrw = scrollY > 225;
    const isScrolledTablet = scrollY > 150;
    const isScrolledTabletPor = scrollY > 150;
    const isScrolledMobile = scrollY > 150;
    const isScrolledMobileB = scrollY > 1060;

    const logoTranslateY = scrollY > 375 ? "49rem" : "0rem";
    const logoTranslateYNrw = scrollY > 300 ? "48rem" : "0rem";
    const logoTranslateYTablet = scrollY > 275 ? "45.5rem" : "0rem";
    const logoTranslateYTabletPor = scrollY > 275 ? "56.75rem" : "0rem";
    const logoTranslateYMobile = scrollY > 250 ? "92.2rem" : "0rem";

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
                      translateYMobile={translateYMobile}
                      translateYMobileB={translateYMobileB}
                      isScrolled={isScrolled}
                      isScrolledNrw={isScrolledNrw}
                      isScrolledTablet={isScrolledTablet}
                      isScrolledTabletPor={isScrolledTabletPor}
                      isScrolledMobile={isScrolledMobile}
                      isScrolledMobileB={isScrolledMobileB}
                      logoTranslateY={logoTranslateY}
                      logoTranslateYNrw={logoTranslateYNrw}
                      logoTranslateYTablet={logoTranslateYTablet}
                      logoTranslateYTabletPor={logoTranslateYTabletPor}
                      logoTranslateYMobile={logoTranslateYMobile}
                      orientation={orientation}
                      scrollY={scrollY}
                      scrollingDown={scrollingDown}
                      sectionsRef={sectionsRef}
                      {...props} />;
  };
};
