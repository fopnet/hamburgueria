import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { logout } from '../../../store/actions';
import * as routesPath from '../../../shared/routes';

class Logout extends Component {
  // componentDidMount() {
  UNSAFE_componentWillMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to={routesPath.HOME_ROUTE} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Logout));
