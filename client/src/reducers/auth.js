import * as actionType from '../actions';

const initialState = {
  authenticated: false,
};

export default (auth = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_USER_SUCCESS:
      return action.payload;
    default:
      return auth;
  }
};
