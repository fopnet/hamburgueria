import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux/Aux";

import classes from "./SideDrawer.css";
import PropTypes from "prop-types";

const sideDrawer = props => {
  const attachedClasses = [classes.SideDrawer];
  if (props.open) {
    attachedClasses.push(classes.Open);
  } else {
    attachedClasses.push(classes.Close);
  }

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;

sideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};
