import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function CheckAuth(ChildComponent) {
  class CheckAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) this.props.history.push('/login');
    }

    render() {
      return <div>{this.props.authenticated ? <ChildComponent /> : null}</div>;
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(CheckAuthentication);
}
