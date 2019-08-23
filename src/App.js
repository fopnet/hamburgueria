import React, { Component } from "react";
import "./index.css";
import Layout from "./hoc/Layout/Layout";
import BuilderBurger from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={asyncOrders} />
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/" exact component={BuilderBurger} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
