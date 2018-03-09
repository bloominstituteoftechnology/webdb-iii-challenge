import React, { Component } from 'react';

import Header from './header';
import Posts from '../posts/posts';
import TopStatusBar from './topStatusBar';
import AddPost from '../posts/addPost';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        {/* <TopStatusBar /> */}

        <AddPost />

        <Posts />
      </div>
    );
  }
}

export default App;
