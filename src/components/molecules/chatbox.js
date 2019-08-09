import React from 'react';

import Typography from '@material-ui/core/Typography';

// Material UI Libraries
import { makeStyles } from '@material-ui/core/styles';

// Material UI Components
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      minHeight: '40vh',
      marginTop: '10px'
    },
}));

export default function Textbox() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Chat Box
        </Typography>
        <Typography component="p">
          Messages
        </Typography>
        <Typography component="p">
          Textbox
        </Typography>
      </Paper>
    </div>
  );
}