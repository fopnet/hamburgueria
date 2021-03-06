import * as actionsTypes from '../actions/actions';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_ORDERS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case actionsTypes.FETCH_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionsTypes.PURCHASE_SUCCESS:
      return {
        ...state,
        loading: true,
        purchased: true,
      };
    case actionsTypes.FETCH_PURCHASE:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(action.order),
      };

    case actionsTypes.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
