import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Features from "../pages/features";
import Newspaper from "../pages/newspaper";
import Industry from "../pages/industry";
import About from "../pages/about";
import Contact from "../pages/contact";
import Error from "../pages/error";

const PathRoute = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/features" exact component={Features} />
      <Route path="/newspaper" exact component={Newspaper} />
      <Route path="/industry" exact component={Industry} />
      <Route path="/about" exact component={About} />
      <Route path="/contact" exact component={Contact} />
      <Route component={Error} />
    </Switch>
  );
};

export default PathRoute;
