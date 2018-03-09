import { combineReducers } from 'redux';
import AuthReducer from './auth';
import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './users';
import PostsReducer from './posts';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  users: UsersReducer,
  posts: PostsReducer,
});

export default rootReducer;
