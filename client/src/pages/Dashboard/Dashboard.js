import React, { Component } from "react";
import Auth from "../../auth/Authenticate";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import MenuWithSubMunes from "../../utils/MenuWithSubMenus";
import RouteWithSubRoutes from "../../utils/RouteWithSubRoutes";
import Main from "../../layouts/Main";

export class Dashboard extends Component {
  onLogout = () => {
    localStorage.clear();
    Auth.logout(() => {
      this.props.history.push("/login");
    });
  };
  render() {
    const { routes } = this.props;
    return (
      <BrowserRouter>
        <Main>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Main>
      </BrowserRouter>
    );
  }
}

export default withRouter(Dashboard);
