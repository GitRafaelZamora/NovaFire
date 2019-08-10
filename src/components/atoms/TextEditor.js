import React, { Component } from 'react'

// Material UI
import { withStyles } from '@material-ui/core';

import testcode from '../../assets/testcode'

// 
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

const styles = theme => ({
  document: {
    color: 'yellow',
    fontFamily: 'Inconsolata, monospace',
    fontSize: '14px',
    minHeight: '100%',
    textAlign: 'left',
    padding: '20px',
  }
})

export class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
  }

  updateContent = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { classes } = this.props

    var syntax = testcode;

    return (
      <LiveProvider name="code" code={this.state.code} onChange={this.updateContent} contentEditable={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  }
}

export default withStyles(styles)(TextEditor);
