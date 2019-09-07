import React, { Component } from 'react'

// Material UI
import Grid from '@material-ui/core/Grid';
import Chatbox from '../molecules/chatbox'

export class Sidebar extends Component {
  render() {
    return (
      <Grid container spacing={1} direction="column">
        <Grid item md={12}>
          {/*<Chatbox />*/}
        </Grid>
        <Grid item md={12}>
          {/*<Chatbox />*/}
        </Grid>
      </Grid>
    )
  }
}

export default Sidebar
