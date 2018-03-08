import axios from 'axios';

const ROOT_URL = `http://localhost:5000`;

export const ERROR_GENERAL = 'ERROR_GENERAL';

export const USERS_GET_START = 'USERS_GET_START';
export const USERS_GET_SUCCESS = 'USERS_GET_SUCCESS';
export const USERS_GET_ERROR = 'USERS_GET_ERROR';
export const USERS_GET_FINISH = 'USERS_GET_FINISH';

export const POSTS_GET_START = 'POSTS_GET_START';
export const POSTS_GET_SUCCESS = 'POSTS_GET_SUCCESS';
export const POSTS_GET_ERROR = 'POSTS_GET_ERROR';
export const POSTS_GET_FINISH = 'POSTS_GET_FINISH';

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
