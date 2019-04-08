import React, { Component } from 'react'
// import routes from '../routes'
// import MenuWithSubMenus from '../utils/MenuWithSubMenus'

import { Layout, Menu, Icon } from 'antd'

const { SubMenu } = Menu
const { Header } = Layout

class HeaderLayout extends Component {
  state = {
    current: 'home',
  }

  handleClick = e => {
    console.log('click ', e)
    this.setState({
      current: e.key,
    })
  }
  render() {
    return (
      // <ul>
      //   {routes.map((route, i) => (
      //     <MenuWithSubMenus key={i} {...route} />
      //   ))}
      // </ul>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ float: 'right' }}
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
            <Menu.Item key="setting:4">Log out</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="setting:5">Design by Chin</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    )
  }
}

export default HeaderLayout
