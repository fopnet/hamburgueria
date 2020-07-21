import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      type="button"
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button
      type="button"
      className={classes.More}
      onClick={props.added}
    >
      More
    </button>
  </div>
);
export default buildControl;
