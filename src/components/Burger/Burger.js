import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";
import { withRouter } from "react-router-dom";

const burger = props => {

  let tranformedIngredients = Object.keys(props.ingredients)
    .map(key =>
      [...Array(props.ingredients[key])].map((_, i) => (
        <BurgerIngredient key={key + i} type={key} />
      )),
    )
    .reduce((acc, el) => {
      return acc.concat(el);
    }, []);

  if (tranformedIngredients.length === 0) {
    tranformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {tranformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
