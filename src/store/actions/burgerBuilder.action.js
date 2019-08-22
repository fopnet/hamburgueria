import * as actionsTypes from "./actions";
import axios from "../../axios-order";

const setIngredients = ingredients => {
  // redux thunk function to async request
  return dispatch => {
    return dispatch({
      type: actionsTypes.SET_INGREDIENT,
      ingredients: ingredients,
    });
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

export const addIngredient = name => {
  return {
    type: actionsTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = name => {
  return {
    type: actionsTypes.RENOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const initIngredients = () => {
  // redux thunk function to async request
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(resp => {
        dispatch(setIngredients(resp.data));
      })
      .catch(err => dispatch(setError(err)));
  };
};
