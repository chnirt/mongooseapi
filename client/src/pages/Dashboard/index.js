import React, { Component } from "react";
import Auth from "../../auth/Authenticate";
import { withRouter } from "react-router";

export class Dashboard extends Component {
  onLogout = () => {
    localStorage.clear();
    Auth.logout(() => {
      this.props.history.push("/login");
    });
  };
  render() {
    return (
      <div>
        Dashboard
        <button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

export default withRouter(Dashboard);
