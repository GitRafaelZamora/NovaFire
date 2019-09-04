import React, { Component } from 'react'
// Material UI
import { withStyles } from '@material-ui/core';

// React Editor
import { LiveProvider, LiveEditor } from 'react-live';
// Redux
import { setCode, setHistory, setClient } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'


const styles = theme => ({
  /* Add Component Styles Here */
});

export class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wsClient: this.props.setClient(this.props.session),
      user: this.props.user,
      activeDocument: this.props.activeDocument,
    }
  }

  updateCode = (code) => {
    this.props.setCode(this.state.wsClient, code, this.state.user.email);
  };

  componentDidMount() {
    this.props.setClient(this.props.session);
    this.props.setCode(this.props.document.activeDocument.content);
  }

  render() {
    const classes = this.props.classes;
    const { code } = this.props;
    return (
      <>
      <LiveProvider code={code}  contentEditable={true}>
        <LiveEditor name="code" onChange={this.updateCode} />
      </LiveProvider>
      </>
      
    )
  }
}

TextEditor.propTypes = {
  setHistory: Proptypes.func.isRequired,
  setCode: Proptypes.func.isRequired,
  document: Proptypes.object.isRequired,
  code: Proptypes.string.isRequired
};

const mapStateToProps = (state) => ({
  code: state.data.code,
  document: state.document,
});

const mapActionsToProps = {
  setCode,
  setHistory,
  setClient
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextEditor));