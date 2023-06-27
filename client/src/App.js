import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Public from "./compopent/Public";
import Dashboard from "./pages/dashboard/admin/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/*" exact component={Dashboard} />
        <Route component={Public} />
      </Switch>
    </Router>
  );
}

export default App;
