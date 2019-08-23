import React, { Component } from "react";
import "./index.css";
import Layout from "./hoc/Layout/Layout";
import BuilderBurger from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
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
            <Route path="/auth" component={asyncAuth} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/app" component={BuilderBurger} />
            <Redirect from="/" to="/auth" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
