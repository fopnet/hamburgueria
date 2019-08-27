import * as actionsTypes from "./actions";
import axios from "../../axios-order";

const signUpInit = () => {
  return {
    type: actionsTypes.LOGIN,
    loading: true,
    error: null,
  };
};

const setLoggedState = (idToken, userId) => {
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
      loading: false,
    });
  };
};

export const checkTimeOut = expiresInSeconds => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresInSeconds * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem(actionsTypes.TOKEN_NAME);
  localStorage.removeItem(actionsTypes.EXPIRES_DATE);

  return {
    type: actionsTypes.LOGOUT,
    token: null,
    userId: null,
  };
};
export const setRedirectPath = path => {
  return {
    type: actionsTypes.SET_AUTH_REDIRECT_PATH,
    authRedirectPath: path,
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
        const expirationDate = new Date(
          new Date().getTime() + +resp.data.expiresIn * 1000,
        );

        localStorage.setItem(actionsTypes.TOKEN_NAME, resp.data.idToken);
        localStorage.setItem(actionsTypes.EXPIRES_DATE, expirationDate);
        /**
         * Here is not necessery store the localId
         * It is possible do recover by this api
         * https://firebase.google.com/docs/reference/rest/auth#section-get-account-info
         */
        localStorage.setItem(actionsTypes.TOKEN_USER_ID, resp.data.localId);

        dispatch(setLoggedState(resp.data.idToken, resp.data.localId));
        dispatch(checkTimeOut(resp.data.expiresIn));
      })
      .catch(err => {
        console.error(err.response.data.error);
        dispatch(setError(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem(actionsTypes.TOKEN_NAME);
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem(actionsTypes.EXPIRES_DATE),
      );
      const userId = localStorage.getItem(actionsTypes.TOKEN_USER_ID);

      if (expirationDate > new Date()) {
        dispatch(setLoggedState(token, userId));
        dispatch(
          checkTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000,
          ),
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
