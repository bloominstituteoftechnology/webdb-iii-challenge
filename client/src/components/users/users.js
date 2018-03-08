import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions';

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="Users">
        {this.props.users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { getUsers })(Users);
