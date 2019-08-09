import React, { Component } from 'react'

// Material UI
import { makeStyles, Paper } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '20vh',
    backgroundColor: '#282c34',
    color: 'white'
  },
}));

export default function console() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      This is the Console.
    </Paper>
  )
}
