import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

export class SiderLayout extends Component {
  render() {
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                User
              </span>
            }
          >
            <Menu.Item key="1">User List</Menu.Item>
            <Menu.Item key="2">Active Users</Menu.Item>
            <Menu.Item key="3">Blocked Users</Menu.Item>
            <Menu.Item key="4">Expired Users</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="file" />
                Post
              </span>
            }
          >
            <Menu.Item key="5">Post List</Menu.Item>
            <Menu.Item key="6">Recent Posts</Menu.Item>
            <Menu.Item key="7">Banned Posts</Menu.Item>
            <Menu.Item key="8">Warming Posts</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="message" />
                Comment
              </span>
            }
          >
            <Menu.Item key="9">Comment List</Menu.Item>
            <Menu.Item key="10">Recent Comments</Menu.Item>
            <Menu.Item key="11">Old Comments</Menu.Item>
            <Menu.Item key="12">Banned Commnents</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default SiderLayout
