import React, { Component } from "react";
import Auth from "../auth/Authenticate";
import { withRouter } from "react-router";
// import routes from '../routes'
// import MenuWithSubMenus from '../utils/MenuWithSubMenus'

import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Header } = Layout;

class HeaderLayout extends Component {
  state = {
    current: "home"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };
  onLogout = () => {
    localStorage.clear();
    Auth.logout(() => {
      this.props.history.push("/login");
    });
  };
  render() {
    return (
      // <ul>
      //   {routes.map((route, i) => (
      //     <MenuWithSubMenus key={i} {...route} />
      //   ))}
      // </ul>
      <Header className="header clearfix">
        <div className="logo" />
        <Menu
          theme="light"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ lineHeight: "64px", float: "right" }}
        >
          <Menu.Item key="home">
            <Icon type="home" />
            Home
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="user" />
                Hello, Chin
              </span>
            }
          >
            <Menu.Item key="setting:1">My Profile</Menu.Item>
            <Menu.Item key="setting:2">Update Information</Menu.Item>
            <Menu.Item key="setting:3">Change Password</Menu.Item>
            <Menu.Item key="setting:4" onClick={this.onLogout}>
              Log out
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>Design by Chin</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(HeaderLayout);
