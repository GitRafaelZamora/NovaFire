import React from 'react'

// Material UI
import { makeStyles, Paper } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '20vh',
    backgroundColor: '#282c34',
    color: 'white'
  },
}));

// changed from 'console', 'console' is a JS keyword
export default function EditorConsole() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      This is the Console.
    </Paper>
  )
}
