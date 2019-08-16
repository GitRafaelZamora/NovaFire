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
      user: this.props.user
    }
  }

  updateCode = (code) => {
    this.props.setCode(this.state.wsClient, code, this.state.user.email);
  };

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
  documentHistory: Proptypes.array.isRequired,
  code: Proptypes.string.isRequired
};

const mapStateToProps = (state) => ({
  code: state.data.code,
  documentHistory: state.data.documentHistory
});

const mapActionsToProps = {
  setCode,
  setHistory,
  setClient
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextEditor));