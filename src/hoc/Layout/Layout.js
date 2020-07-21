import React from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawClodedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toogledHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    return (
      <Aux>
        <Toolbar
          toogled={this.toogledHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawClodedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
