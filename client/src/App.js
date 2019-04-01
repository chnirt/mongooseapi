import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './components/Layout/Main'

import Home from './components/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      result: ''
    }
  }
  componentDidMount() {
    fetch('https://chinmongooseapi.herokuapp.com/users')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => err)
  }
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