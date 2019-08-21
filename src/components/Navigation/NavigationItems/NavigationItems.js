import React from "react";
import classes from "./NavigationItems.css";
import NavItem from "./NavigationItem/NavigationItem";

const navItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/" active exact>
        Burger Builder
      </NavItem>
      <NavItem link="/orders" exact>
        Orders
      </NavItem>
    </ul>
  );
};

export default navItems;
