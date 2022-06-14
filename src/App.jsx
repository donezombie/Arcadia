import useSagaCreators from "hooks/useSagaCreators";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { authActions } from "redux/creators/modules/auth";
import RootRoute from "routes/RootRoute";
import { Toaster } from "react-hot-toast";

import "./scss/styles.scss";

const App = () => {
  const { dispatch } = useSagaCreators();

  useEffect(() => {
    dispatch(authActions.checkAuth);
  }, [dispatch]);

  //! Render
  return (
    <Fragment>
      <Toaster position="top-right" />
      <Router>
        <Switch>
          <RootRoute />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
