import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import DefaultLayout from "layout/DefaultLayout";

import routes from "./routes";
import CommonStyles from "components/CommonStyles";

export const RootRoute = (props) => {
  return (
    <DefaultLayout>
      <Suspense fallback={<CommonStyles.CircularProgress />}>
        <Switch>
          {routes().map((route, idx) => {
            if (route?.isPrivate) {
              return (
                <PrivateRoute
                  key={`${route.path}-${idx}`}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            }

            return (
              <Route
                key={`${route.path}-${idx}`}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
        </Switch>
      </Suspense>
    </DefaultLayout>
  );
};

export default RootRoute;
