import React from "react";
import classes from "./NavigationItem.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const navItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink exact={props.exact} activeClassName={classes.active} to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navItem;

navItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
