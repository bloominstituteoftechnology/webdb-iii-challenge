import React, { Component } from 'react';

import AddPost from '../posts/addPost';

class TopStatusBar extends Component {
  state = {
    isAddingPost: false,
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

        {this.state.isAddingPost ? <AddPost /> : null}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     submitSucceeded: state.form.addPost.submitSucceeded
//   }
// }

export default TopStatusBar;
