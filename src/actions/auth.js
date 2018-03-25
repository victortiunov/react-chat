import * as types from '../constants/auth';
import * as routes from '../constants/routes';
import callApi from '../utils/call-api';

export function signup(username, password) {
  return (dispatch) => {
    dispatch({
      type: types.SIGNUP_REQUEST,
    });

    return callApi(routes.SIGNUP, null, { method: 'POST' }, { username, password })
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        localStorage.setItem('token', json.token);

        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: json,
        });
      })
      .catch(reason =>
        dispatch({
          type: types.SIGNUP_FAILURE,
          payload: reason,
        }));
  };
}

export function login(username, password) {
  return (dispatch) => {
    dispatch({
      type: types.LOGIN_REQUEST,
    });

    return callApi(routes.LOGIN, null, { method: 'POST' }, { username, password })
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        localStorage.setItem('token', json.token);

        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json,
        });
      })
      .catch(reason =>
        dispatch({
          type: types.LOGIN_FAILURE,
          payload: reason,
        }));
  };
}

export function logout() {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.logout) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGOUT_REQUEST,
    });

    return callApi(routes.LOGOUT)
      .then(() => {
        localStorage.removeItem('token');

        dispatch({
          type: types.LOGOUT_SUCCESS,
        });
      })
      .catch((reason) => {
        dispatch({
          type: types.LOGOUT_FAILURE,
          payload: reason,
        });
      });
  };
}

export function recieveAuth() {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: types.RECIEVE_AUTH_REQUEST,
    });

    if (!token) {
      return dispatch({
        type: types.RECIEVE_AUTH_FAILURE,
        payload: 'There is no token!',
      });
    }

    return callApi(routes.USERS_ME, token)
      .then(json =>
        dispatch({
          type: types.RECIEVE_AUTH_SUCCESS,
          payload: json,
        }))
      .catch(reason =>
        dispatch({
          type: types.RECIEVE_AUTH_FAILURE,
          payload: reason,
        }));
  };
}
