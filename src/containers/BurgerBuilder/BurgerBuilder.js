import React, { Component } from "react";
import { connect } from "react-redux";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErroHandler";
import axios from "../../axios-order";
import * as routesPath from "../../shared/routes";
import { withRouter } from "react-router-dom";

import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setRedirectPath,
} from "../../store/actions/index";

class BuilderBurger extends Component {
  state = {
    purchasing: false,
  };

  // componentDidMount() {
  UNSAFE_componentWillMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirect(routesPath.CHECKOUT_ROUTE);
      this.props.history.push(routesPath.LOGIN_ROUTE);
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push(routesPath.CHECKOUT_ROUTE);

    /* using redux instead    
    const queryParams = [];
    for (let prop in this.props.ings) {
      const q = `${encodeURIComponent(prop)}=${encodeURIComponent(
        this.props.ings[prop],
      )}`;
      queryParams.push(q);
    }

    this.props.history.push({
      pathname: "checkout",
      search: "?" + queryParams.join("&"),
    });
    */
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BurgerControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            totalPrice={this.props.totalPrice}
            disabled={disableInfo}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onPurchaseInit: () => dispatch(purchaseInit()),
    onSetRedirect: path => dispatch(setRedirectPath(path)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BuilderBurger, axios)));
