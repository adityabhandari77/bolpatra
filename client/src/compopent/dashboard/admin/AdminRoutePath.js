import React from "react";
import { Route, Switch } from "react-router-dom";

import Create from "../../../pages/dashboard/admin/Create";
import List from "../../../pages/dashboard/admin/List";

const AdminRoutePath = () => {
  return (
    <Switch>
      <Route path="/admin/create-notice" exact component={Create} />
      <Route path="/admin/all-notices" exact component={List} />
    </Switch>
  );
};

export default AdminRoutePath;
