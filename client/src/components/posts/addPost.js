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
      <div className="AddPost">
        <div className="AddPostTitle">Add Post</div>

        <form
          className="AddPostForm"
          onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <fieldset className="AddPostFieldSet">
            <Field
              className="AddPostFieldSet__field"
              name="text"
              component="input"
              type="text"
            />
          </fieldset>

          <button className="AddPostSubmitButton" action="submit">
            +
          </button>
        </form>
      </div>
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
  fields: ['text'],
})(AddPost);
