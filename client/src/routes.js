import Login from "./pages/Login";
import Register from "./pages/Register";

// Application
import Dashboard from "./pages/Dashboard/Dashboard";

// USER
import ScreenUser from "./pages/User/Index";
import ScreenUserForm from "./pages/User/Form";
import ScreenUserList from "./pages/User/List";

const routes = [
  {
    label: "Login",
    path: "/login",
    component: Login
  },
  {
    label: "Register",
    path: "/register",
    component: Register
  },
  {
    label: "Dashboard",
    path: "/",
    exact: true,
    private: true,
    component: Dashboard,
    routes: [
      {
        label: "User List",
        path: "/users",
        exact: true,
        component: ScreenUserList
      },
      {
        label: "Create User",
        path: "/users/create",
        exact: true,
        component: ScreenUserForm
      }
    ]
  }
];

export default routes;
