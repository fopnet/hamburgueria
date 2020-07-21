import React from 'react';
import PropTypes from 'prop-types';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
import orderClasses from './OrderButton.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Total Price:
      {' '}
      <strong>
        {' '}
        $
        {props.totalPrice.toFixed(2)}
      </strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      type="button"
      className={orderClasses.OrderButton}
      disabled={props.totalPrice === 0}
      onClick={props.ordered}
    >
      {props.isAuth ? 'ORDER NOW' : 'Please, SignUp to Order !'}
    </button>
  </div>
);

buildControls.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default buildControls;
