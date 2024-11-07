import React from "react";
import { useResize } from "./hooks/useResize.js";

export const withHooksHOC = (Component) => {
  return (props) => {
    const isTablet = useResize();

    return <Component screenChange={isTablet} {...props} />;
  };
};