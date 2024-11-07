import React from "react";
import PropTypes from 'prop-types';

import logo from "./../img/terraBeanLogo.png";

function Header(props) {
  return (
    <React.Fragment>
      <header>
        <div className='mast-head'>
          <div className="logoContainer">
            <img className="logo" src={logo} alt="Terra Bean Coffee Co logo" />
          </div>
            {props.widgetAreaComponent}
          {/* </div> */}
        </div>
      </header>
    </React.Fragment>
  );
}

Header.propTypes = {
  widgetAreaComponent: PropTypes.object
};

export default Header;
