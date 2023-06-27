import React from "react";

import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "tomato",
    backgroundSize: "cover",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar>
        <Drawer />
        <Typography variant="h6" color="inherit">
          Bolpatra
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
