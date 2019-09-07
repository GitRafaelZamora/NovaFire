import React, { Component } from 'react'
// Material UI
import { withStyles } from '@material-ui/core';

// React Editor
import { LiveProvider, LiveEditor } from 'react-live';
// Redux
import { setHistory, setClient } from '../../redux/actions/dataActions'
import { saveDocument, setContent } from '../../redux/actions/documentActions'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'

const styles = theme => ({
  firepadContainer: {
    backgroundColor: '#282c34',
    color: "white",
    height: "1000px",
    margin: "auto"
  },
  textEditor: {

  }
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
    // Get Firebase Database reference to the document.
    // var firepadRef = this.getTextDocumentRef(this.props.document.activeDocument.docID);
    var firepadRef = this.getTextDocumentRef();

    // monaco.editor.create(document.getElementById('firepad-container'), {
    //   language: 'javascript'
    // });

    // Create CodeMirror
    var codeMirror = window.CodeMirror(document.getElementById('firepad-container'),
        { lineWrapping: true, lineNumbers: true }
    );
    console.log(codeMirror);

    // Create Firepad
    var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextToolbar: false,
      richTextShortcuts: true
    });
    console.log(firepad);

    // Initialize contents.
    firepad.on('ready', function() {
      console.log("firepad ready");
      if (firepad.isHistoryEmpty()) {
        console.log("History empty()");
        firepad.setHtml('Collaborative-editing made easy.\n');
      }
    });
  }

  handleSave = (e) => {
    this.props.saveDocument(this.props.document.activeDocument);
  };

  getTextDocumentRef() {
    var ref = window.firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push();
      console.log(window.location);
      window.location = window.location + '#' + ref.key;
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

  render() {
    const { document }  = this.props;
    const { classes } = this.props;

    console.log(document.loading);

    return (
        <div className={classes.textEditor}>
          <div id={"firepad-container"} className={classes.firepadContainer}></div>
        </div>
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
  setClient,
  saveDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextEditor));