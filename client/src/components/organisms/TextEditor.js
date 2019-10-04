import React, { Component } from 'react'
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core';
import PropTypes from "prop-types";
import {loginUser} from "../../redux/actions/userActions";
import {getDocuments} from "../../redux/actions/documentActions";

const styles = theme => ({
  firepadContainer: {
    backgroundColor: '#282c34',
    color: "white",
    height: "1000px",
  },
  textEditor: {
  }
});

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // Get Firebase Database reference to the document.
    // var firepadRef = this.getTextDocumentRef(this.props.document.activeDocument.docID);

    let firepadRef = this.getTextDocumentRef();
    setTimeout(()=>{}, 10000);

    // Create CodeMirror
    var codeMirror = window.CodeMirror(document.getElementById('firepad-container'),
        { lineWrapping: true, lineNumbers: true }
    );
    console.log(codeMirror);

    // Firepad was attached to the window in public/index.html
    // Creating firepad instance.
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

  getTextDocumentRef() {
    var ref = window.firebase.database().ref();
    // Grab the Unique ID for the document.
    var hash = this.props.document.activeDocument.docID;
    console.log("HASH: " + hash);
    console.log(ref);
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push();
      window.location = window.location + '#' + ref.key;
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }

  render() {
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
  classes: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  document: state.document,
});

const mapActionsToProps = {
  loginUser,
  getDocuments,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextEditor));