import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";

class OrderSummary extends React.PureComponent {
  /**
   *  this component can be a function component. This is only to debug purposes. */
  componentWillUpdate() {
    console.log("Summary updated");
  }
  render() {
    const summary = Object.keys(this.props.ingredients).map(key => (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {this.props.ingredients[key]}
      </li>
    ));

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicioous burger with folowing ingredients:</p>
        {summary}
        <p>
          Total Price:<strong> $ {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;

OrderSummary.propTypes = {
  purchaseContinued: PropTypes.func.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  ingredients: PropTypes.objectOf(PropTypes.number),
};
