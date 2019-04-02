import React, { Component } from 'react'

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: ''
    }
  }
  componentDidMount() {
    fetch('http://localhost:6969/users')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ users: res }
        )
      })
      .catch(err => err)
  }
  render() {
    const { users } = this.state
    console.log(users)
    return (
      <div>
        Home
        {users && users.map((user, i) => <h1 key={i}>{user.email}</h1>)}
      </div>
    )
  }
}

export default Home
