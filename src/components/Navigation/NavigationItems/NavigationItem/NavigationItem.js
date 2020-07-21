import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink exact={props.exact} activeClassName={classes.active} to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

navItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default navItem;
