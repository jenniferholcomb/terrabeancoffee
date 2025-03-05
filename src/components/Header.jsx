import React from "react";
import PropTypes from 'prop-types';

import logo from "/terraBeanLogo.webp";
import steward from "/img/stewardAward.webp";
import league from "/img/leagueAward.webp";
import bio from "/img/bioAward.webp";

function Header({logoTranslateY, logoTranslateYNrw, logoTranslateYTablet, logoTranslateYTabletPor, logoTranslateYMobile, isWdDesktop, isTablet, isTabletPor, isMobile, orientation, isScrolledLogo}) {

  return (
    <React.Fragment>
      <header className='mast-head'>
        <div 
          className="logoContainer"
          style={{
            transform: !isMobile && (orientation === "portrait") && (window.innerHeight > 960)
              ? "none"
              : isWdDesktop 
              ? `translateY(${logoTranslateY})` 
              : isTablet
              ? `translateY(${logoTranslateYTablet})`
              : isTabletPor
              ? `translateY(${logoTranslateYTabletPor})`
              : isMobile
              ? `translateY(${logoTranslateYMobile})`
              : `translateY(${logoTranslateYNrw})`, 
            transition: "transform 0.5s ease-in-out" 
          }}
        >
          <img className={`${isScrolledLogo && isMobile ? "logoMobileScrolled" : "logo"}`} src={logo} alt="Terra Bean Coffee Co logo" />
        </div>
        <div className='awardsContainer'>
          <img className="award-1" src={steward} alt="Terra Bean Coffee Co logo" />
          <img className="award-1" src={league} alt="Terra Bean Coffee Co logo" />
          <img className="award-2" src={bio} alt="Terra Bean Coffee Co logo" />
        </div>
      </header>
    </React.Fragment>
  );
}

Header.propTypes = {
  widgetAreaComponent: PropTypes.object
};

export default Header;
