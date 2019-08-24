import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { authCheckState } from "./store/actions/index";
import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import * as routesPath from "./shared/routes";

import "./index.css";

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

class App extends React.Component {
  componentDidMount() {
    this.props.onTrySignup();
  }

  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path={routesPath.ORDERS_ROUTE} component={asyncOrders} />
          <Route path={routesPath.CHECKOUT_ROUTE} component={asyncCheckout} />
          <Route path={routesPath.HOME_ROUTE} component={asyncBuilderBurger} />
          <Route path={routesPath.LOGOUT_ROUTE} component={Logout} />
          <Route path={routesPath.LOGIN_ROUTE} component={asyncAuth} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path={routesPath.LOGIN_ROUTE} component={asyncAuth} />
          <Route path={routesPath.HOME_ROUTE} component={asyncBuilderBurger} />
          <Redirect from="/" to={routesPath.HOME_ROUTE} />
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
