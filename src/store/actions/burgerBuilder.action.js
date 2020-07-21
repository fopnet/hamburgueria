import * as actionsTypes from './actions';
import axios from '../../axios-order';

const setIngredients = (ingredients) =>
  // redux thunk function to async request
  (dispatch) => dispatch({
    type: actionsTypes.SET_INGREDIENT,
    ingredients,
    totalPrice: 0,
    building: false,
  });

const setError = (error) =>
  // redux thunk function to async request
  (dispatch) => dispatch({
    type: actionsTypes.FETCH_FAILURE,
    error,
  });

export const addIngredient = (name) => ({
  type: actionsTypes.ADD_INGREDIENT,
  ingredientName: name,
  building: true,
});

export const removeIngredient = (name) => ({
  type: actionsTypes.RENOVE_INGREDIENT,
  ingredientName: name,
  building: true,
});

export const initIngredients = () =>
  // redux thunk function to async request
  (dispatch) => {
    axios
      .get('/ingredients.json')
      .then((resp) => {
        dispatch(setIngredients(resp.data));
      })
      .catch((err) => dispatch(setError(err)));
  };
