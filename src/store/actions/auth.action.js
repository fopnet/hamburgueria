import * as actionsTypes from "./actions";
import axios from "../../axios-order";

const signUpInit = () => {
  return {
    type: actionsTypes.LOGIN,
    loading: true,
    error: null,
  };
};

const setAuth = (idToken, userId) => {
  return {
    type: actionsTypes.LOGGED,
    userId: userId,
    token: idToken,
    loading: false,
    error: null,
  };
};

const setError = error => {
  // redux thunk function to async request
  return dispatch => {
    return dispatch({
      type: actionsTypes.FETCH_FAILURE,
      error: error,
    });
  };
};

export const checkTimeOut = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const logout = () => {
  return {
    type: actionsTypes.LOGOUT,
    token: null,
    userId: null,
  };
};
export const setRedirectPath = path => {
  return {
    type: actionsTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const auth = (email, pwd, isSignUp) => {
  return dispatch => {
    dispatch(signUpInit());

    const authData = {
      email: email,
      password: pwd,
      returnSecureToken: true,
    };

    const endPoint = "https://identitytoolkit.googleapis.com/v1/accounts:";
    const token = "AIzaSyCq33vXWkV-0SgLobHS65jHWxug_sWYs8c";
    const url = isSignUp
      ? `${endPoint}signUp?key=${token}`
      : `${endPoint}signInWithPassword?key=${token}`;

    return axios
      .post(url, authData)
      .then(resp => {
        dispatch(setAuth(resp.data.idToken, resp.data.localId));
        dispatch(checkTimeOut(resp.data.expiresIn));
      })
      .catch(err => {
        console.error(err.response.data.error);
        dispatch(setError(err.response.data.error));
      });
  };
};
