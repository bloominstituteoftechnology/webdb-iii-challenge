import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';

const Header = _ => {
  return (
    <header className="Header">
      <NavLink to="/" className="HeaderContainer">
        <img src={logo} className="AppLogo" alt="logo" />
      </NavLink>
    </header>
  );
};

export default Header;
