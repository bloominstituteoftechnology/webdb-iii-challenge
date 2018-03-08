import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post => (
          <div key={post.id} className="Post">
            {post.text}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
