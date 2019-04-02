import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './components/Layout/Main'

import Home from './components/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </Main>
      </BrowserRouter>
    )
  }
}

export default App