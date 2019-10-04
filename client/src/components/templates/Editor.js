import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material UI 
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Components
import TextEditor from '../organisms/TextEditor'

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

    }
  }

  render() {
    return (
        <Grid container>
          <Grid item xs={2} sm={2} md={2}>

          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <TextEditor />
          </Grid>
        <Grid item xs={2} sm={2} md={2}>

        </Grid>

        </Grid>
    )
  }
}
const mapStateToProps = (state) => ({
  document: state.document,
});

const mapActionsToProps = {

};
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Editor));
