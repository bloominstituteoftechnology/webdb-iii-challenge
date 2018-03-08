import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import Posts from '../posts/posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="AppHeader">
          <img src={logo} className="AppLogo" alt="logo" />

          <h1 className="AppHeader__title">Welcome to React</h1>
        </header>

        <Posts />
      </div>
    );
  }
}

export default App;
