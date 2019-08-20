import React from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
        <Toolbar toogled={this.toogledHandler} />
        <SideDrawer
          closed={this.sideDrawClodedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
