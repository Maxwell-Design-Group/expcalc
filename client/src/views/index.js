// import contact from './pages/website/contact';
// import product from './pages/website/product';
// import UseCase from './pages/website/UseCase';

import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Dashboard from "../Components/Dashboard/Dashboard";

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: "Home",
    path: "/home",
    component: Home,
  },
  {
    name: "Client Information",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "SignIn",
    path: "/signIn",
    component: Login,
  },
];

export default pageList;
