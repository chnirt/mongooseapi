import React, {
  Component
} from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core'

const styles = {
  root: {
    flexGrow: 1
  }
}

export class Header extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              Chnirthgram
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Header)