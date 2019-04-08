import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiCaller from "../utils/apiCaller";

export class Register extends Component {
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
      "users",
      {
        email: email,
        password: password
      },
      null
    )
      .then(res => {
        this.setState({
          message: "Registration was successful."
        });
      })
      .catch(err => {
        const { status } = err.response;
        if (status === 409) {
          this.setState({ message: "Email is existed." });
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
        Register
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
          <button>Register</button>
          <Link to="/login">Login</Link>
        </form>
        {message}
      </div>
    );
  }
}

export default Register;
