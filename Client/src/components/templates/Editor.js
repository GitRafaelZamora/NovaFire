import React, { Component } from 'react'

// Material UI 
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components
import SideBar from '../organisms/Sidebar'
import TextEditor from '../atoms/TextEditor'
import Console from '../atoms/console'

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
  render() {
    const classes = this.props;
    return (
      <>
      <Grid container>
        <Grid item xs={8} sm={6} md={8}>
          <TextEditor />
        </Grid>
        <Grid item xs={4} sm={6} md={4}>
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Console />
        </Grid>
      </Grid>
      
      </>
    )
  }
}

export default withStyles(styles)(Editor);
