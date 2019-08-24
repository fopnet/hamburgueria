import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import "./index.css";
import { authCheckState } from "./store/actions/index";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncBuilderBurger = asyncComponent(() => {
  return import("./containers/BurgerBuilder/BurgerBuilder");
});

class App extends Component {
  componentDidMount() {
    this.props.onTrySignup();
  }

  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/app" component={asyncBuilderBurger} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/app" component={asyncBuilderBurger} />
          <Redirect from="/" to="/app" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStarteToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
const mapDispathToProps = dispath => {
  return {
    onTrySignup: () => dispath(authCheckState()),
  };
};

export default connect(
  mapStarteToProps,
  mapDispathToProps,
)(App);
