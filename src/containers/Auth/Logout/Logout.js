import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../../store/actions";
import * as routesPath from "../../../shared/routes";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to={routesPath.HOME_ROUTE} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
