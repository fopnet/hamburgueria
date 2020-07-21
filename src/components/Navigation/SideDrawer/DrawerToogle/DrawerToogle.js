import React from 'react';
import PropTypes from 'prop-types';
import classes from './DrawerToggle.css';

const drawerToogle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked} role="button">
    <div />
    <div />
    <div />
  </div>
);
export default drawerToogle;

drawerToogle.propTypes = {
  clicked: PropTypes.func.isRequired,
};
