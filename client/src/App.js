import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React & RDBMS-API-Full</h1>
        </header>
        <p className="App-intro">
          Building a blog system using an API [<small>using a Relational Database: </small><strong>sqlite3</strong>] and create-react-app for frontend.
        </p>
      </div>
    );
  }
}

export default App;
