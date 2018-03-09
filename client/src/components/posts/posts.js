import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, deletePost, updatePost } from '../../actions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  deletePostButtonClickedHandler = id => {
    this.props.deletePost(id);
  };

  editPostButtonClickHandler = (id, userId) => {
    const text = prompt('Enter text to update post.');
    const updatedUserId = prompt('Enter a userId', userId);

    if (text !== '' || updatedUserId !== '') {
      if (updatedUserId === '') this.props.updatePost(id, { text });
      else if (text === '')
        this.props.updatePost(id, { userId: updatedUserId });
      else this.props.updatePost(id, { userId: updatedUserId, text });
    }
  };

  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post => (
          <div key={post.id} className="Post">
            <div
              className="Post__deleteButton"
              onClick={_ =>
                this.deletePostButtonClickedHandler(post.id, post.userId)
              }
            >
              x
            </div>

            {`${post.text} (${
              this.props.users.length > 0
                ? this.props.users.find(user => user.id === post.userId).name
                : null
            })`}

            <div
              className="Post__editButton"
              onClick={_ => this.editPostButtonClickHandler(post.id)}
            >
              ...
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    users: state.users,
  };
};

export default connect(mapStateToProps, { getPosts, deletePost, updatePost })(
  Posts,
);
