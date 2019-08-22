import * as actionsTypes from "../actions/actions";

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: null,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1.0,
  meat: 2.0,
  cheese: 1.0,
};

export const builderReducer = (state = initialState, action) => {
  // console.log("reducer state", action);

  switch (action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionsTypes.RENOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionsTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: null,
      };
    case actionsTypes.FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
