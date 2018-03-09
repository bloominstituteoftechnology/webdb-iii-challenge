import React, { Component } from 'react';

class TopStatusBar extends Component {
  state = {
    isAddingFriend: false,
  };

  addPostButtonClickedHandler = _ => {
    this.setState({ isAddingPost: !this.state.isAddingPost });
  };

  render() {
    return (
      <div className="TopStatusBar">
        <div
          className="TopStatusBar__addNewPost"
          onClick={this.addPostButtonClickedHandler}
        >
          {this.state.isAddingPost ? '-' : '+'}
        </div>
      </div>
    );
  }
}

export default TopStatusBar;
