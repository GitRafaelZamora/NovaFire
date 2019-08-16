import React, { Component } from 'react'

// Material UI 
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Components
import SideBar from '../organisms/SideBar'
import TextEditor from '../organisms/TextEditor'
import EditorConsole from '../atoms/editor_console'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    height: '80vh',
  },
});

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionID: null,
      session: null,
      user: null,
      noUserFound: false,
      noSession: false
    }
  }

  render() {
    return (
        <Grid container>
          <Grid item xs={8} sm={6} md={8}>
            <TextEditor session={this.state.session} user={this.state.user}/>
          </Grid>
          <Grid item xs={4} sm={6} md={4}>
            <SideBar />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <EditorConsole />
          </Grid>
        </Grid>
    )
  }
}

export default withStyles(styles)(Editor);