import React from 'react'
import HeaderLayout from './HeaderLayout'
import SiderLayout from './SiderLayout'
import FooterLayout from './FooterLayout'

import { Layout, Menu, Breadcrumb, Icon } from 'antd'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const Main = ({ children }) => {
  return (
    <div>
      <HeaderLayout />
      <Layout>
        <SiderLayout />
        {children}
      </Layout>

      <FooterLayout />
    </div>
  )
}

export default Main
