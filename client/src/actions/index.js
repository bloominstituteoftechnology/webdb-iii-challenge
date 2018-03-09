import axios from 'axios';
import { reset } from 'redux-form';

const ROOT_URL = `http://localhost:5000`;

export const AUTH_USER_START = 'AUTH_USER_START';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAIL = 'AUTH_USER_FAIL';
export const AUTH_USER_ERROR = 'AUTH_USER_ERROR';
export const AUTH_USER_FINISH = 'AUTH_USER_FINISH';

export const USERS_GET_START = 'USERS_GET_START';
export const USERS_GET_SUCCESS = 'USERS_GET_SUCCESS';
export const USERS_GET_ERROR = 'USERS_GET_ERROR';
export const USERS_GET_FINISH = 'USERS_GET_FINISH';

export const POSTS_GET_START = 'POSTS_GET_START';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_ERROR = 'POSTS_GET_ERROR';
export const POSTS_GET_FINISH = 'POSTS_GET_FINISH';

export const POSTS_ADD_START = 'POSTS_ADD_START';
export const POSTS_ADD_SUCCESS = 'POSTS_ADD_SUCCESS';
export const POSTS_ADD_ERROR = 'POSTS_ADD_ERROR';
export const POSTS_ADD_FINISH = 'POSTS_ADD_FINISH';

export const POSTS_DELETE_START = 'POSTS_DELETE_START';
export const POSTS_DELETE_SUCCESS = 'POSTS_DELETE_SUCCESS';
export const POSTS_DELETE_ERROR = 'POSTS_DELETE_ERROR';
export const POSTS_DELETE_FINISH = 'POSTS_DELETE_FINISH';

export const login = (user, history) => {
  const { userId, name } = user;

  return dispatch => {
    dispatch({ type: AUTH_USER_START });

    axios
      .get(`${ROOT_URL}/users/${userId}`)
      .then(({ data }) => {
        if (data.name === name) {
          dispatch({ type: AUTH_USER_SUCCESS, payload: userId });
          history.push('/');
          dispatch({ type: AUTH_USER_FINISH });
        } else {
          dispatch({ type: AUTH_USER_FAIL });
          dispatch({ type: AUTH_USER_FINISH });
        }
      })
      .catch(err => {
        dispatch({ type: AUTH_USER_ERROR, payload: err });
        dispatch({ type: AUTH_USER_FINISH });
      });
  };
};

export const getUsers = _ => {
  return dispatch => {
    dispatch({ type: USERS_GET_START });

    axios
      .get(`${ROOT_URL}/users`)
      .then(({ data }) => {
        dispatch({
          type: USERS_GET_SUCCESS,
          payload: data,
        });

        dispatch({ type: USERS_GET_FINISH });
      })
      .catch(err => {
        dispatch({ type: USERS_GET_ERROR, payload: err });
        dispatch({ type: USERS_GET_FINISH });
      });
  };
};

export const getPosts = _ => {
  return dispatch => {
    dispatch({ type: POSTS_GET_START });

    axios
      .get(`${ROOT_URL}/posts`)
      .then(({ data }) => {
        dispatch({
          type: POSTS_GET_SUCCESS,
          payload: data,
        });

        dispatch({ type: POSTS_GET_FINISH });
      })
      .catch(err => {
        dispatch({ type: POSTS_GET_ERROR, payload: err });
        dispatch({ type: POSTS_GET_FINISH });
      });
  };
};

export const addPost = post => {
  return dispatch => {
    dispatch({ type: POSTS_ADD_START });

    axios
      .post(`${ROOT_URL}/posts`, post)
      .then(({ data }) => {
        dispatch({ type: POSTS_ADD_SUCCESS });

        dispatch({ type: POSTS_GET_START });

        axios
          .get(`${ROOT_URL}/posts`)
          .then(({ data }) => {
            dispatch({
              type: POSTS_GET_SUCCESS,
              payload: data,
            });

            dispatch({ type: POSTS_GET_FINISH });
            dispatch(reset('addPost'));

            dispatch({ type: POSTS_ADD_FINISH });
          })
          .catch(err => {
            dispatch({ type: POSTS_GET_ERROR, payload: err });
            dispatch({ type: POSTS_GET_FINISH });
            dispatch({ type: POSTS_ADD_FINISH });
          });
      })
      .catch(err => {
        dispatch({ type: POSTS_ADD_ERROR, payload: err });
        dispatch({ type: POSTS_ADD_FINISH });
      });
  };
};

export const deletePost = id => {
  return dispatch => {
    dispatch({ type: POSTS_DELETE_START });

    axios
      .delete(`${ROOT_URL}/posts/${id}`)
      .then(({ data }) => {
        dispatch({ type: POSTS_DELETE_SUCCESS });

        dispatch({ type: POSTS_GET_START });

        axios
          .get(`${ROOT_URL}/posts`)
          .then(({ data }) => {
            dispatch({
              type: POSTS_GET_SUCCESS,
              payload: data,
            });

            dispatch({ type: POSTS_GET_FINISH });
            dispatch(reset('addPost'));

            dispatch({ type: POSTS_DELETE_FINISH });
          })
          .catch(err => {
            dispatch({ type: POSTS_GET_ERROR, payload: err });
            dispatch({ type: POSTS_GET_FINISH });
            dispatch({ type: POSTS_DELETE_FINISH });
          });
      })
      .catch(err => {
        dispatch({ type: POSTS_DELETE_ERROR, payload: err });
        dispatch({ type: POSTS_DELETE_FINISH });
      });
  };
};
