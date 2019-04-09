import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiCaller from "../utils/apiCaller";
import { Layout, Form, Input, Icon, Button } from "antd";

const { Content } = Layout;
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { email, password } = values;
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              Or Have an account?<Link to="/login">Log in</Link>
            </Form.Item>
          </Form>
          {message}
        </Content>
      </Layout>
    );
  }
}

export default Form.create({ name: "normal_login" })(Register);
