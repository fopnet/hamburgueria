import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";
const orderSummary = props => {
  const sumamry = Object.keys(props.ingredients).map(key => (
    <li key={key}>
      <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
      {props.ingredients[key]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicioous burger with folowing ingredients:</p>
      {sumamry}
      <p>
        Total Price:<strong> $ {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;

orderSummary.propTypes = {
  purchaseContinued: PropTypes.func.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  ingredients: PropTypes.map,
};
