import * as actionsTypes from "./actions";
import axios from "../../axios-order";

const purchaseSuccess = order => {
  return {
    type: actionsTypes.PURCHASE_SUCCESS,
    order: order,
  };
};

const setError = error => {
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

export const fetchPurchase = (
  formData,
  ingredients,
  totalPrice,
  token,
  uid,
) => {
  const order = {
    ingredients: ingredients,
    totalPrice: totalPrice,
    orderData: formData,
  };

  return dispatch => {
    dispatch(fecthPurchase());

    axios
      .post(`/orders/${uid}.json?auth=${token}`, order)
      .then(response => {
        dispatch(purchaseSuccess(response.data));
      })
      .catch(error => {
        dispatch(setError(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionsTypes.PURCHASE_INIT,
  };
};

export const fetchInit = () => {
  return {
    type: actionsTypes.FETCH_ORDERS,
  };
};

export const setOrders = orders => {
  return {
    type: actionsTypes.SET_ORDERS,
    orders: orders,
  };
};

export const fetchOrders = (token, uid) => {
  return dispatch => {
    dispatch(fetchInit());

    axios
      .get(`/orders/${uid}.json?auth=${token}`)
      .then(resp => {
        const orders = [];
        for (let key in resp.data) {
          orders.push({
            ...resp.data[key],
            id: key,
          });
        }
        dispatch(setOrders(orders));
      })
      .catch(error => {
        dispatch(setError(error));
      });
  };
};
