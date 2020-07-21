import React from "react";
import classes from "./Backdrop.css";
const backdrop = props =>
  props.show ? <div role="button" onClick={props.clicked} className={classes.Backdrop}>{props.children}</div> : null;
export default backdrop;
