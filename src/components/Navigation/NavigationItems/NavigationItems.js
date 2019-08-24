import React from "react";
import classes from "./NavigationItems.css";
import NavItem from "./NavigationItem/NavigationItem";
import PropTypes from "prop-types";
import * as routesPath from "../../../shared/routes";

const navItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link={routesPath.HOME_ROUTE} active exact>
        Burger Builder
      </NavItem>
      {props.isAuth ? (
        <NavItem link={routesPath.ORDERS_ROUTE}>Orders</NavItem>
      ) : null}
      {props.isAuth ? (
        <NavItem link={routesPath.LOGOUT_ROUTE}>Logout</NavItem>
      ) : (
        <NavItem link={routesPath.LOGIN_ROUTE}>Authenticate</NavItem>
      )}
    </ul>
  );
};

export default navItems;

navItems.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
