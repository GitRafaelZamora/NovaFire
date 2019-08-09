import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';

const styles = {
  texteditor: {
    color: 'green'
  }
}

export class TextEditor extends Component {
  render() {
    const classes = this.props
    return (
      <div className={classes.texteditor} contentEditable={true}>
        This is the TextEditor
      </div>
    )
  }
}

export default withStyles(styles)(TextEditor);
