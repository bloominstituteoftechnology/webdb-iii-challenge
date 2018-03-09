import * as actionType from '../actions';

export default (users = [], action) => {
  switch (action.type) {
    case actionType.USERS_GET_SUCCESS:
      return action.payload;
    default:
      return users;
  }
};
