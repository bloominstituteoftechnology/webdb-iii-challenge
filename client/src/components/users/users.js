import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, deleteUser, updateUser } from '../../actions';

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  deleteUserButtonClickedHandler = id => {
    this.props.deleteUser(id);
  };

  updateUserButtonClickHandler = id => {
    const name = prompt('Enter a user name to update.');

    if (name) this.props.updateUser(id, { name });
  };

  render() {
    return (
      <div className="Users">
        <div className="UsersTitle">Users</div>

        {this.props.users.map(user => (
          <div key={user.id} className="User">
            <div
              className="User__deleteButton"
              onClick={_ => this.deleteUserButtonClickedHandler(user.id)}
            >
              x
            </div>

            {user.name}

            <div
              className="User__editButton"
              onClick={_ => this.updateUserButtonClickHandler(user.id)}
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
    users: state.users,
  };
};

export default connect(mapStateToProps, { getUsers, deleteUser, updateUser })(
  Users,
);
