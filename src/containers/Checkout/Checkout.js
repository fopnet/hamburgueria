import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  UNSAFE_componentWillMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    let totalPrice = 0;
    for (let p of queryParams.entries()) {
      totalPrice += ingredients[p[0]] = +p[1];
    }

    const state = {
      ingredients: ingredients,
      totalPrice: totalPrice,
    };
    // console.log("ingredients from url state ", state);
    this.setState(state);
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default Checkout;
