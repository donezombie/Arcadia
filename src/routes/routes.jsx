import { lazy } from "react";
import withErrorBoundary from "components/HOCs/withErrorBoundary";
import { RouteBase } from "constants/routeUrl";

const Dashboard = lazy(() => import("views/Dashboard"));
const Login = lazy(() => import("views/Login"));
const Register = lazy(() => import("views/Register"));
const Homepage = lazy(() => import("views/Homepage"));

const Page404 = lazy(() => import("views/Page404"));

//* For public route
const routes = () => [
  {
    path: RouteBase().Home,
    exact: true,
    name: "Home",
    component: withErrorBoundary(Homepage),
  },
  {
    path: RouteBase().Dashboard,
    name: "Dashboard",
    component: withErrorBoundary(Dashboard),
  },
  {
    path: RouteBase().Login,
    exact: true,
    name: "Login",
    component: withErrorBoundary(Login),
  },
  {
    path: RouteBase().Register,
    exact: true,
    name: "Register",
    component: withErrorBoundary(Register),
  },
  { name: "404", component: withErrorBoundary(Page404) },
];

export default routes;
