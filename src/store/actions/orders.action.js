import * as actionsTypes from "./actions";
import axios from "../../axios-order";

const purchaseSuccess = order => {
  return {
    type: actionsTypes.PURCHASE_SUCCESS,
    order: order,
  };
};

const purchaseError = error => {
  return {
    type: actionsTypes.FETCH_FAILURE,
    error: error,
  };
};

const fecthPurchase = error => {
  return {
    type: actionsTypes.FETCH_PURCHASE,
  };
};

export const fetchPurchase = (formData, ingredients, totalPrice) => {
  const order = {
    ingredients: ingredients,
    totalPrice: totalPrice,
    orderData: formData,
  };

  return dispatch => {
    dispatch(fecthPurchase());

    axios
      .post("/orders.json", order)
      .then(response => {
        dispatch(purchaseSuccess(response.data));
        // this.props.history.push("/");
      })
      .catch(error => {
        dispatch(purchaseError(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionsTypes.PURCHASE_INIT,
  };
};
