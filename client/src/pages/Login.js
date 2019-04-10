import React, { Component, useState } from "react";
import Auth from "../auth/Authenticate";
import { Link } from "react-router-dom";
import apiCaller from "../utils/apiCaller";
import "./Login.css";
import { Layout, Form, Input, Icon, Checkbox, Button } from "antd";

const { Content } = Layout;

export class Login extends Component {
  state = {
    email: "chin@gmail.com",
    password: "1",
    isAdmin: false,
    message: ""
  };
  onChange = e => {
    e.target.name === "isAdmin"
      ? this.setState({ [e.target.name]: e.target.checked })
      : this.setState({
          [e.target.name]: e.target.value
        });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { email, password } = values;
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
    const { message } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      // labelCol: {
      //   xs: { span: 12, offset: 6 },
      //   sm: { span: 8, offset: 6 }
      // },
      wrapperCol: {
        md: {
          span: 4,
          offset: 10
        }
      }
    };
    return (
      <Layout>
        <Content>
          <Form
            {...formItemLayout}
            onSubmit={this.onSubmit}
            className="login-form"
          >
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: false
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
          {message}
        </Content>
      </Layout>
    );
  }
}

export default Form.create({ name: "normal_login" })(Login);
