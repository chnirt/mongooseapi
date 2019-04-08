import React, { Component } from "react";
import Auth from "../auth/Authenticate";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import apiCaller from "../utils/apiCaller";

export class Login extends Component {
  state = {
    email: "chin@gmail.com",
    password: "1",
    message: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    apiCaller(
      "post",
      "users/login",
      {
        email: email,
        password: password
      },
      null
    )
      .then(res => {
        Auth.authenticate(() => {
          localStorage.setItem("token", res.data.token);
          this.props.history.push("/");
        });
      })
      .catch(err => {
        const { status } = err.response;
        if (status === 401) {
          this.setState({
            message: "Email or Password is not correct."
          });
        }
      });
  };
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/");
    }
  }
  render() {
    const { email, password, message } = this.state;
    return (
      <div>
        Login
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            placeholder="email"
            required
          />
          <br />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            placeholder="password"
            required
          />
          <br />
          <button>Login</button>
          <Link to="/register">Register</Link>
        </form>
        {message}
      </div>
    );
  }
}

export default withRouter(Login);
