import React from "react";
import classes from "./Order.css";

const order = props => {
  const summary = Object.keys(props.order.ingredients).map((key, i) => (
    <span
      key={key}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0px 8px",
        border: "1px solid #ccc",
        padding: "5px",
      }}
    >
      {key} ({props.order.ingredients[key]})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      {summary}
      <p>
        Price: <strong>$ {props.order.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
