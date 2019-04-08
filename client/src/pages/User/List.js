import React, { Component } from 'react'

export class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: '',
    }
  }

  componentDidMount() {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { users } = this.state
    return (
      <div>
        UserList
        {users &&
          users.map((user, i) => (
            <ul key={i}>
              <li>UserId: {user.id}</li>
              <li>
                Avatar : <img src={user.avatar} alt={user.id} />
              </li>
              <li>
                Fullname: {user.first_name} {user.last_name}
              </li>
            </ul>
          ))}
      </div>
    )
  }
}

export default List
