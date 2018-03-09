import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { login } from '../../actions';

import Header from '../app/header';

class Login extends Component {
  handleFormSubmit = ({ userId, name }) => {
    this.props.login({ userId, name }, this.props.history);
  };

  renderError = _ => {
    return this.props.error ? this.props.error : null;
  };

  render() {
    return (
      <div className="Login">
        <Header />

        <form
          className="LoginForm"
          onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <fieldset className="LoginFieldSet">
            <label className="LoginLabel">UserId</label>

            <Field
              className="LoginFieldSet__field"
              name="userId"
              component="input"
              type="text"
            />
          </fieldset>

          <fieldset className="LoginFieldSet">
            <label className="LoginLabel">Name</label>
            <Field
              className="LoginFieldSet__field"
              name="name"
              component="input"
              type="text"
            />
          </fieldset>

          <button className="LoginSubmitButton" action="submit">
            login
          </button>
        </form>

        <div className="LoginError">{this.renderError()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
  };
};

Login = connect(mapStateToProps, { login })(Login);

export default reduxForm({
  form: 'login',
  fields: ['userId', 'name'],
})(Login);
