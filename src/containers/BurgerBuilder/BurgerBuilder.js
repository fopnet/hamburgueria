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

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 1.0,
  meat: 2.0,
  cheese: 1.0,
};

class BuilderBurger extends Component {
  state = {
    totalPrice: 0,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    // axiosOrder
    //   .get("/ingredients.json")
    //   .then(resp => {
    //     this.setState({ ingredients: resp.data });
    //   })
    //   .catch(err => this.setState({ error: err }));
  }

  getNewSate = (val, type) => {
    const newState = {
      ...this.state,
    };
    newState.ingredients[type] = this.state.ingredients[type] + val;
    newState.totalPrice =
      val > 0
        ? this.state.totalPrice + INGREDIENT_PRICE[type]
        : this.state.totalPrice - INGREDIENT_PRICE[type];
    return newState;
  };

  addIngredientsHandler = type => {
    const newState = this.getNewSate(1, type);

    this.setState(newState);
  };
  removeIngredientsHandler = type => {
    if (this.props.ings[type] === 0) return;
    const newState = this.getNewSate(-1, type);
    this.setState(newState);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
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
        purchaseCanceled={this.state.onIngredientRemoved}
        purchaseContinued={this.state.onIngredientAdded}
        totalPrice={this.state.totalPrice}
      />
    );

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        <Burger ingredients={this.props.ings} />
        <BurgerControls
          ingredientsAdded={this.addIngredientsHandler}
          ingredientsRemoved={this.removeIngredientsHandler}
          disabled={disableInfo}
          totalPrice={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
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
