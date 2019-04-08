import React from 'react'
import MenuWithSubMenus from '../../utils/MenuWithSubMenus'
import RouteWithSubRoutes from '../../utils/RouteWithSubRoutes'
import { Switch } from 'react-router-dom'

const Index = ({ routes }) => {
  return (
    <div>
      User Index
      <ol>
        {routes.map((route, i) => (
          <MenuWithSubMenus key={i} {...route} />
        ))}
      </ol>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  )
}

export default Index
