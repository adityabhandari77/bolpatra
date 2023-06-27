import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import RoutePath from "./PathRoute";

const Public = () => {
  return (
    <Router>
      <Header />
      <RoutePath />
      <Footer />
    </Router>
  );
};

export default Public;
