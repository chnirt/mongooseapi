import React, { Component } from "react";
import Auth from "../../auth/Authenticate";
import { BrowserRouter, Switch, withRouter } from "react-router-dom";
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
      <div>
        <button onClick={this.onLogout}>Logout</button>
        <BrowserRouter>
          <Main>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </Main>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(Dashboard);
