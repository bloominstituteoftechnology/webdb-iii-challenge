import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { addPost } from '../../actions';

class AddPost extends Component {
  handleFormSubmit = ({ userId, text }) => {
    this.props.addPost({ userId, text });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
      >
        <fieldset>
          <label>UserId:</label>
          <Field name="userId" component="input" type="text" />
        </fieldset>

        <fieldset>
          <label>Text:</label>
          <Field name="text" component="input" type="text" />
        </fieldset>

        <button action="submit">Add Post</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

AddPost = connect(mapStateToProps, { addPost })(AddPost);

export default reduxForm({
  form: 'addPost',
  fields: ['userId', 'text'],
})(AddPost);
