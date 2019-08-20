import React from "react";
import classes from "./DrawerToggle.css";
import PropTypes from "prop-types";
const drawerToogle = props => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div />
      <div />
      <div />
    </div>
  );
};
export default drawerToogle;

drawerToogle.propTypes = {
  clicked: PropTypes.func.isRequired,
};
