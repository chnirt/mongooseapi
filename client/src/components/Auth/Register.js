import React from 'react'
import {
  Paper,
  TextField,
  Button,
  withStyles
} from '@material-ui/core'

const styles = {
  textField: {
    width: '100%',
    marginBottom: 5
  },
  btnBlock: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  }
}

export class Register extends React.Component {
  // rconst
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      repeatPassword: ''
    }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log('Change')
  }
  onSubmit = (e) => {
    e.preventDefault()
    const { email, username, password, repeatPassword } = this.state
    const userData = {
      email: email,
      username: username,
      password: password,
      repeatPassword: repeatPassword
    }
    console.log(userData)
  }
  render() {
    const { classes } = this.props
    const { email, username, password, repeatPassword } = this.state
    console.log(this.state)
    return (
      <React.Fragment>
        <Paper style={{ padding: 8 }}>
          <form onSubmit={this.onSubmit}>
            <TextField
              type="email"
              label="Email"
              placeholder='Email'
              className={classes.textField}
              name='email'
              value={email}
              onChange={this.onChange}
            />
            <TextField
              type="text"
              label="Username"
              placeholder='Username'
              className={classes.textField}
              name='username'
              value={username}
              onChange={this.onChange}
            />
            <TextField
              type='password'
              label='Password'
              className={classes.textField}
              name='password'
              value={password}
              onChange={this.onChange}
            />
            <TextField
              type='password'
              label='Repeat Password'
              className={classes.textField}
              name='repeatPassword'
              value={repeatPassword}
              onChange={this.onChange}
            />
            <div className={classes.btnBlock}>
              <Button type='submit' variant='outlined'>
                Submit
            </Button>
            </div>
          </form>
        </Paper>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Register)