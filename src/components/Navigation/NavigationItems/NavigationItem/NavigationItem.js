import React from "react";
import classes from "./NavigationItem.css";
import PropTypes from "prop-types";
const navItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <a href={props.link} className={props.active ? "active" : null}>
        {props.children}
      </a>
    </li>
  );
};

export default navItem;

navItem.propTypes = {
  link: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
