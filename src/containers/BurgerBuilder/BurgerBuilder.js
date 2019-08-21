import React, { Component } from "react";
import axiosOrder from "../../axios-order";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErroHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 1.0,
  meat: 2.0,
  cheese: 1.0,
};

class BuilderBurger extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    axiosOrder
      .get("/ingredients.json")
      .then(resp => {
        this.setState({ ingredients: resp.data });
      })
      .catch(err => this.setState({ error: err }));
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
    if (this.state.ingredients[type] === 0) return;
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
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Felipe",
        email: "fop.net@gmail.com",
        address: {
          street: "rua pendanga",
          zipCode: "59154315",
          city: "parnamirim",
        },
      },
    };
    axiosOrder
      .post("/orders.json", order)
      .then(resp => console.log(resp))
      .catch(err => console.error(err))
      .finally(() => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
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

        <Burger ingredients={this.state.ingredients} />
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

export default withErrorHandler(BuilderBurger, axiosOrder);
