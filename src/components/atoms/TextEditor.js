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
  /* Add Component Styles Here */
})

export class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code: testcode,
    }
  }

  updateContent = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const classes = this.props.classes
    return (
      <LiveProvider code={this.state.code} onChange={this.updateContent} contentEditable={true}>
        <LiveEditor />
      </LiveProvider>
    )
  }
}

export default withStyles(styles)(TextEditor);
