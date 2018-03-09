import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, getUsers } from '../../actions';

class Posts extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getPosts();
  }

  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post => (
          <div key={post.id} className="Post">
            {`${post.text} > ${
              this.props.users.length > 0
                ? this.props.users.find(user => user.id === post.userId).name
                : null
            }`}
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

export default connect(mapStateToProps, { getPosts, getUsers })(Posts);
