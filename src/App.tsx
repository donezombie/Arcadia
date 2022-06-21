import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/scss/styles.scss";

import { RouteBase } from "constants/routeUrl";
import DefaultLayout from "layout/DefaultLayout";
import LoginPage from "views/Login";
import RegisterPage from "views/Register";

const App: React.FC = () => {
  // RENDER
  return (
    <Router>
      <Switch>
        <Route path={RouteBase.Register} exact component={RegisterPage} />
        <Route path={RouteBase.Login} exact component={LoginPage} />
        <Route path={RouteBase.Home} component={DefaultLayout} />
      </Switch>
    </Router>
  );
};

export default App;
