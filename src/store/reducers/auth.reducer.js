import * as actionsTypes from "../actions/actions";
import { updateObject } from "../../shared/utility";
const initialState = {
  email: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.LOGIN:
      return updateObject(state, {
        loading: action.loading,
        error: action.error,
      });
    case actionsTypes.LOGGED:
      return updateObject(state, {
        userId: action.userId,
        token: action.token,
        loading: action.loading,
      });
    case actionsTypes.FETCH_FAILURE:
      return updateObject(state, {
        error: action.error,
        loading: action.loading,
      });
    default:
      return state;
  }
};
