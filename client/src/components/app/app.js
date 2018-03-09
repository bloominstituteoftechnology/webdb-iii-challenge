import React, { Component } from 'react';

import Header from './header';
import Posts from '../posts/posts';
import TopStatusBar from './topStatusBar';
import AddPost from '../posts/addPost';
import Users from '../users/users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <TopStatusBar />

        <AddPost />

        <Posts />

        <Users />
      </div>
    );
  }
}

export default App;
