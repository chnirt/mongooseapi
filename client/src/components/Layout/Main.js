import React, { Component } from 'react'
import {
  Grid,
} from '@material-ui/core'
import Header from './Header'

export class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid container justify='center'>
          <Grid
            item
            style={{ marginTop: 30 }}
            xs={12}
            sm={6}
          >
            {this.props.children}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Main
