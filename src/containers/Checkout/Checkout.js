import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as routesPath from "../../shared/routes";

class Checkout extends React.Component {
  /*
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
  */
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to={routesPath.HOME_ROUTE} />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapsStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapsStateToProps)(Checkout);
