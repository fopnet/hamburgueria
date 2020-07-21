import * as actionsTypes from './actions';
import axios from '../../axios-order';

const purchaseSuccess = (order) => ({
  type: actionsTypes.PURCHASE_SUCCESS,
  order,
});

const setError = (error) => ({
  type: actionsTypes.FETCH_FAILURE,
  error,
});

const fecthPurchase = () => ({
  type: actionsTypes.FETCH_PURCHASE,
});

export const fetchPurchase = (
  formData,
  ingredients,
  totalPrice,
  token,
  uid,
) => {
  const order = {
    ingredients,
    totalPrice,
    orderData: formData,
  };

  return (dispatch) => {
    dispatch(fecthPurchase());

    axios
      .post(`/orders/${uid}.json?auth=${token}`, order)
      .then((response) => {
        dispatch(purchaseSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const purchaseInit = () => ({
  type: actionsTypes.PURCHASE_INIT,
});

export const fetchInit = () => ({
  type: actionsTypes.FETCH_ORDERS,
});

export const setOrders = (orders) => ({
  type: actionsTypes.SET_ORDERS,
  orders,
});

export const fetchOrders = (token, uid) => (dispatch) => {
  dispatch(fetchInit());

  axios
    .get(`/orders/${uid}.json?auth=${token}`)
    .then((resp) => {
      const orders = [];
      for (const key in resp.data) {
        if ({}.hasOwnProperty.call(resp.data, key)) {
          orders.push({
            ...resp.data[key],
            id: key,
          });
        }
      }
      dispatch(setOrders(orders));
    })
    .catch((error) => {
      dispatch(setError(error));
    });
};
