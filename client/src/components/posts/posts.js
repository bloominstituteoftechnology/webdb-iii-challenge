import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../../actions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  deletePostButtonClickedHandler = id => {
    this.props.deletePost(id);
  };

  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post => (
          <div key={post.id} className="Post">
            <div
              className="Post__deleteButton"
              onClick={_ => this.deletePostButtonClickedHandler(post.id)}
            >
              x
            </div>

            {`${post.text} (${
              this.props.users.length > 0
                ? this.props.users.find(user => user.id === post.userId).name
                : null
            })`}

            <div className="Post__editButton">...</div>
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

export default connect(mapStateToProps, { getPosts, deletePost })(Posts);
