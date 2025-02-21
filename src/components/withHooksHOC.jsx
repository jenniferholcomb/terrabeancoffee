import React from "react";
import { useResize } from "./hooks/useResize.js";
import { useScroll } from "./hooks/useScroll.js";

export const withHooksHOC = (Component) => {
  return (props) => {
    const isTablet = useResize();
    const scrollY = useScroll();
    const translateY = scrollY > 350 ? "60rem" : "0rem";
    const isScrolled = scrollY > 350; 
    const logoTranslateY = scrollY > 400 ? "47rem" : "0rem";

    return <Component screenChange={isTablet} 
                      translateY={translateY} 
                      isScrolled={isScrolled}
                      logoTranslateY={logoTranslateY}
                      {...props} />;
  };
};