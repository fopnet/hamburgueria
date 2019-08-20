import React from "react";
import classes from "./Logo.css";
import img from "../../assets/burger-logo.png";

const logo = props => {
  return (
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={img} alt="Hamburgueria" />
    </div>
  );
};

export default logo;
