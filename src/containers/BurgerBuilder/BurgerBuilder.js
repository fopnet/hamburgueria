import React, { Component } from "react";
import axiosOrder from "../../axios-order";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErroHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BuilderBurger extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null,
  };

  UNSAFE_componentWillMount() {
    // axiosOrder
    //   .get("/ingredients.json")
    //   .then(resp => {
    //     this.setState({ ingredients: resp.data });
    //   })
    //   .catch(err => this.setState({ error: err }));
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
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
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.props.totalPrice}
      />
    );

    let burger = this.state.error ? (
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
          />
        </Aux>
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
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({
        type: actionTypes.RENOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BuilderBurger, axiosOrder));
