import React from 'react';
import { withRouter } from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
  // console.log("burger", props.ingredients);

  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) =>
      // eslint-disable-next-line react/no-array-index-key
      [...Array(props.ingredients[igKey])].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />))
    .reduce((arr, el) => arr.concat(el), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
