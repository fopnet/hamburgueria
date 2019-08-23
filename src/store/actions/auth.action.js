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

export const auth = (email, pwd, isSignUp) => {
  return dispatch => {
    dispatch(signUpInit());

    const authData = {
      email: email,
      password: pwd,
      returnSecureToken: true,
    };

    const token = "AIzaSyCq33vXWkV-0SgLobHS65jHWxug_sWYs8c";
    let url = isSignUp
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    url += token;

    return axios
      .post(url, authData)
      .then(resp => {
        console.log(resp);
        dispatch(setAuth(resp.data.idToken, resp.data.localId));
      })
      .catch(err => {
        console.error(err.response.data.error);
        dispatch(setError(err.response.data.error));
      });
  };
};
