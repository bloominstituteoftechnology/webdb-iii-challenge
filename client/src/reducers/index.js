import { combineReducers } from 'redux';
// import AuthReducer from './auth'
import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './users';
import postsReducer from './posts';

const rootReducer = combineReducers({
  form: FormReducer,
  users: UsersReducer,
  posts: postsReducer,
});

export default rootReducer;
