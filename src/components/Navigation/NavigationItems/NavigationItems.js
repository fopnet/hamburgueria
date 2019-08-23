import React from "react";
import classes from "./NavigationItems.css";
import NavItem from "./NavigationItem/NavigationItem";
import PropTypes from "prop-types";

const navItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/app" active exact>
        Burger Builder
      </NavItem>
      {props.isAuth ? <NavItem link="/orders">Orders</NavItem> : null}
      {props.isAuth ? (
        <NavItem link="/logout">Logout</NavItem>
      ) : (
        <NavItem link="/auth">Authenticate</NavItem>
      )}
    </ul>
  );
};

export default navItems;

navItems.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
