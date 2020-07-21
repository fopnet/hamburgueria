import * as actionsTypes from '../actions/actions';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: null,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1.0,
  meat: 2.0,
  cheese: 1.0,
};

const changeIngredientAmount = (state, action, amount) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + amount,
  };

  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: action.building,
  };

  return updateObject(state, updatedState);
};

export const builderReducer = (state = initialState, action) => {
  // console.log("reducer state", action);

  switch (action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return changeIngredientAmount(state, action, +1);
    case actionsTypes.RENOVE_INGREDIENT:
      return changeIngredientAmount(state, action, -1);
    case actionsTypes.SET_INGREDIENT:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: action.totalPrice,
        error: null,
      });
    case actionsTypes.FETCH_FAILURE:
      return updateObject(state, { error: action.error });

    default:
      return state;
  }
};
