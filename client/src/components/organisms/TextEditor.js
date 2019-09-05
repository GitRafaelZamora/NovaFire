import React, { Component } from 'react'
// Material UI
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// React Editor
import { LiveProvider, LiveEditor } from 'react-live';
// Redux
import { setContent, setHistory, setClient } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'


const styles = theme => ({
  /* Add Component Styles Here */
});

class TextEditor extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      user: this.props.user,
      activeDocument: this.props.document.activeDocument
    }
  }

  updateContent = (content) => {
    this.props.setContent(content);
  };

  componentDidMount() {
    // Check if someone is editing document.
    // TRUE: Request Document from socket.
    // FALSE: Request Document from server.
      this.props.setContent(this.state.activeDocument.content)
  }

  handleSave = (e) => {
    this.props.saveDocument(localStorage.getItem("content"));
  };

  render() {
    const classes = this.props.classes;
    const { document }  = this.props;
    const content = this.props.content;

    console.log(document.loading);

    let markup = document.loading ? <p>Loading</p> :
        (
            <>
          <LiveProvider code={content}  contentEditable={true}>
            <LiveEditor name="content" onChange={this.updateContent} />
          </LiveProvider>
          <Button type={"submit"}
                  variant={"contained"}
                  color={"primary"}
                  className={classes.button}
                  onClick={this.handleSave}>
            Save
          </Button>
            </>
        );

    return (
        <>
        {markup}
        </>
    )
  }
}

TextEditor.propTypes = {
  setHistory: Proptypes.func.isRequired,
  setContent: Proptypes.func.isRequired,
  document: Proptypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  content: state.document.activeDocument.content,
  user: state.user,
  document: state.document,
});

const mapActionsToProps = {
  setContent,
  setHistory,
  setClient
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextEditor));