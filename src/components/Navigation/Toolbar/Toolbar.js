import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavigationItems/NavigationItems";
import DrawerToogle from "../SideDrawer/DrawerToogle/DrawerToogle";
const toolBar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToogle clicked={props.toogled} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DeskTopOnly}>
        <NavItems />
      </nav>
    </header>
  );
};

export default toolBar;
