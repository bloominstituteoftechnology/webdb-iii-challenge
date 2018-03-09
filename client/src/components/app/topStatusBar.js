import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addUser } from '../../actions';

class TopStatusBar extends Component {
  addUserButtonClickedHandler = _ => {
    this.props.addUser(window.prompt('Enter a user name to add.'));
  };

  render() {
    return (
      <div className="TopStatusBar">
        <div
          className="TopStatusBar__addNewPost"
          onClick={_ => this.addUserButtonClickedHandler()}
        >
          +
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, { addUser })(TopStatusBar);
