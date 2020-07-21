import * as actionsTypes from '../actions/actions';
import { updateObject } from '../../shared/utility';
import * as routesPath from '../../shared/routes';

const initialState = {
  email: null,
  loading: false,
  error: null,
  token: null,
  authRedirectPath: routesPath.HOME_ROUTE,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_AUTH_REDIRECT_PATH:
    case actionsTypes.LOGOUT:
    case actionsTypes.LOGIN:
    case actionsTypes.LOGGED:
    case actionsTypes.FETCH_FAILURE:
      delete action.type;
      return updateObject(state, { ...action });
    default:
      return state;
  }
};
