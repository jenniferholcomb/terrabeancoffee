import React from "react";
import { useResize } from "./hooks/useResize.js";
import { useScroll } from "./hooks/useScroll.js";

export const withHooksHOC = (Component) => {
  return (props) => {
    const isTablet = useResize();
    const scrollY = useScroll();
    const translateMenu = scrollY > 350 ? "60rem" : "0rem";
    const translateCart = scrollY > 300 ? "30rem" : "0rem"; 

    return <Component screenChange={isTablet} 
                      translateMenu={translateMenu} 
                      translateCart={translateCart}
                      {...props} />;
  };
};