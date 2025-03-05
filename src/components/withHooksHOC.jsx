import React, { createRef, useRef } from "react";
import { useResize } from "./hooks/useResize.js";
import { useScroll } from "./hooks/useScroll.js"; 

export const withHooksHOC = (Component) => {
  return (props) => {
    const { isMobile, isTabletPor, isTablet, isDesktop, isWdDesktop, innerHeight, orientation } = useResize();
    const { scrollY, scrollingDown } = useScroll();

    const section1 = document.getElementById("homeSection");
    const section1b = document.getElementById("row1");
    const section2 = document.getElementById("row2");
    let section1Height;
    let section1bHeight;
    let section2Height;
    if (section1 && section1b && section2) {
      section1Height = section1.getBoundingClientRect().height;
      section1bHeight = section1b.getBoundingClientRect().height;
      section2Height = section2.getBoundingClientRect().height;
    }

    const sectionsRef = useRef([]);

    if (sectionsRef.current.length === 0) {
      sectionsRef.current = Array.from({ length: 3 }, () => createRef());
    }

    const translateY = scrollY > 300 ? "65rem" : "0rem";
    const translateYNrw = scrollY > 225 ? "55.5rem" : "0rem";
    const translateYTablet = scrollY > 150 ? "50.75rem" : "0rem";
    const translateYTabletPor = scrollY > 150 ? "57.5rem" : "0rem";
    // const translateYMobile = scrollY > 150 ? "51.8rem" : "0rem";
    const translateYMobile = scrollY > 150 ? `${section1Height}px` : "0rem";
    const translateYMobileB = scrollY > 1060 ? `${(section2Height + section1Height)}px` : `${section1Height}px`;

    const isScrolled = scrollY > 300; 
    const isScrolledNrw = scrollY > 225;
    const isScrolledTablet = scrollY > 150;
    const isScrolledTabletPor = scrollY > 150;
    const isScrolledMobile = scrollY > 150;
    const isScrolledMobileB = scrollY > 1060;
    const isScrolledLogo = scrollY > 700;

    const logoTranslateY = scrollY > 375 ? "51.5rem" : "0rem";
    const logoTranslateYNrw = scrollY > 300 ? "48rem" : "0rem";
    const logoTranslateYTablet = scrollY > 275 ? "45.5rem" : "0rem";
    const logoTranslateYTabletPor = scrollY > 275 ? "56.75rem" : "0rem";
    const logoTranslateYMobile = scrollY > 250 ? `${(section2Height + section1bHeight + 35.2 + 310 )}px` : "0rem";

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
                      isScrolledLogo={isScrolledLogo}
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
