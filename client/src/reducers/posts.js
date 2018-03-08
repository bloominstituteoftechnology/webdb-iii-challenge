import * as actionType from '../actions';

export default (posts = [], action) => {
  switch (action.type) {
    case actionType.POSTS_GET_SUCCESS:
      return action.payload;

    case actionType.POSTS_ADD_SUCCESS:
      return posts;

    default:
      return posts;
  }
};
