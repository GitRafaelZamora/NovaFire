import React from 'react';

// Material UI Libraries
import { makeStyles } from '@material-ui/core/styles';

// Material UI Components


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        minHeight: '100vh',
    },
}));

export default function Textbox() {
  const classes = useStyles();

  return (
    <div>
      This is a Textbox
    </div>
  );
}