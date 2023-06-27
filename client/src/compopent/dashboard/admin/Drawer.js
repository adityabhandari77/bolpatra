import React, { useState } from "react";
import { Link } from "react-router-dom";

import { List, IconButton, makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(4),
  },
}));

const Drawer = ({ data }) => {
  const [state, setState] = useState({ left: false });
  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ [anchor]: open });
  };

  const items = [
    "All Notices",
    "Unpublished Notices",
    "Create Notice",
    "Send Mail",
  ];

  const sideDrawerList = (anchor) => (
    <List>
      {items.map((text, index) => (
        <ListItem
          button
          key={text}
          component={Link}
          to={"/admin/" + text.replace(" ", "-").toLowerCase()}
          onClick={toggleDrawer("left", false)}
        >
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onOpen={toggleDrawer("left", true)}
        onClose={toggleDrawer("left", false)}
      >
        {sideDrawerList("left")}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default Drawer;
