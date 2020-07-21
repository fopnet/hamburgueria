import React, { Suspense}  from "react";
import Spinner from "./components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { authCheckState } from "./store/actions/index";
import Logout from "./containers/Auth/Logout/Logout";
// import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import * as routesPath from "./shared/routes";
import { withRouter } from "react-router-dom";

import "./index.css";

const AsyncCheckout = React.lazy(()=> import("./containers/Checkout/Checkout"));
// const asyncCheckout = asyncComponent(() => {
//   return import("./containers/Checkout/Checkout");
// });

const AsyncAuth = React.lazy(()=> import("./containers/Auth/Auth"));
// const asyncAuth = asyncComponent(() => {
  //   return import("./containers/Auth/Auth");
  // });

const AsyncOrders = React.lazy(()=>import("./containers/Orders/Orders"));
// const asyncOrders = asyncComponent(() => {
//   return import("./containers/Orders/Orders");
// });

const AsyncBuilderBurger = React.lazy(()=> import("./containers/BurgerBuilder/BurgerBuilder"));
// const asyncBuilderBurger = asyncComponent(() => {
//   return import("./containers/BurgerBuilder/BurgerBuilder");
// });import withRouter from './components/Burger/Burger';


class App extends React.Component {
  // componentDidMount() {
  UNSAFE_componentWillMount() {
    this.props.onTrySignup();
  }

  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path={routesPath.ORDERS_ROUTE} component={asyncOrders} /> */}
          <Route path={routesPath.ORDERS_ROUTE} render={()=>(
            <Suspense fallback={<Spinner/>}>
                <AsyncOrders  />
            </Suspense>)}
          />

          {/* <Route path={routesPath.CHECKOUT_ROUTE} component={asyncCheckout} /> */}
          <Route path={routesPath.CHECKOUT_ROUTE} render={()=>(
            <Suspense fallback={<Spinner/>}>
                <AsyncCheckout  />
            </Suspense>)}
          />

          {/* <Route path={routesPath.HOME_ROUTE} component={asyncBuilderBurger} /> */}
          <Route path={routesPath.HOME_ROUTE} render={()=>(
            <Suspense fallback={<Spinner/>}>
                <AsyncBuilderBurger  />
            </Suspense>)}
          />

          <Route path={routesPath.LOGOUT_ROUTE} render={(props)=><Logout {...props}/>} />
          {/* <Route path={routesPath.LOGOUT_ROUTE} component={Logout} /> */}

          {/* <Route path={routesPath.LOGIN_ROUTE} component={asyncAuth} /> */}
          <Route path={routesPath.LOGIN_ROUTE} render={()=>(
            <Suspense fallback={<Spinner/>}>
                <AsyncAuth />
            </Suspense>)}
          />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          {/* <Route path={routesPath.LOGIN_ROUTE} component={asyncAuth} /> */}
          <Route path={routesPath.LOGIN_ROUTE} render={()=>(
            <Suspense fallback={<Spinner/>}>
                <AsyncAuth />
            </Suspense>)}
          />

          {/* <Route path={routesPath.HOME_ROUTE} component={asyncBuilderBurger} /> */}
          <Route path={routesPath.HOME_ROUTE} render={(props)=>(
            <Suspense fallback={<Spinner/>}>
                <AsyncBuilderBurger {...props} />
            </Suspense>
            )}
          />

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

export default withRouter(connect(
  mapStarteToProps,
  mapDispathToProps,
)(App));
