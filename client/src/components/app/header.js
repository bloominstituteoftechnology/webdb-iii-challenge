import React from 'react';

import logo from '../../assets/logo.svg';

const Header = _ => {
  return (
    <header className="Header">
      <div className="HeaderContainer">
        <img src={logo} className="AppLogo" alt="logo" />
      </div>
    </header>
  );
};

export default Header;
