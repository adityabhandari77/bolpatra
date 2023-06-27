import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { withAuthenticator } from "aws-amplify-react";

import NavBar from "../../../compopent/dashboard/admin/NavBar";
import AdminRoutePath from "../../../compopent/dashboard/admin/AdminRoutePath";

const theme = createMuiTheme();

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <AdminRoutePath />
      </Router>
    </ThemeProvider>
  );
};

export default withAuthenticator(Dashboard, true);
