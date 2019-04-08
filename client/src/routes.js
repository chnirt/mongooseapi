import Login from "./pages/Login";
import Register from "./pages/Register";

// Application
import Dashboard from "./pages/Dashboard";

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
        component: ScreenUserList
      },
      {
        label: "Update User",
        path: "/users/create",
        component: ScreenUserForm
      },
      {
        label: "User Index",
        path: "/users",
        component: ScreenUser
      }
    ]
  }
];

export default routes;
