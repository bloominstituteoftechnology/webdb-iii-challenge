import React, { Component } from 'react';

import Posts from '../posts/posts';
import TopStatusBar from './topStatusBar';

import logo from '../../assets/logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="AppHeader">
          <img src={logo} className="AppLogo" alt="logo" />

          <h1 className="AppHeader__title">Welcome to React</h1>
        </header>

        <TopStatusBar />

        <Posts />
      </div>
    );
  }
}

export default App;
