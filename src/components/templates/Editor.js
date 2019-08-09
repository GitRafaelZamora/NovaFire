import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

// Material UI 
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Components
import SideBar from '../organisms/SideBar'
import TextEditor from '../atoms/TextEditor'
import EditorConsole from '../atoms/editor_console'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    height: '80vh',
  },
});

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionID: null,
      session: null
    }
  }

  render() {
    let page;

    if (this.isSessionIDProvided()) {
      // show loading while fetching session info from server
      if (!this.state.session) {
        this.getEditorSession();
        // TODO (Rafael): create atom/component for loading
        page = <div><p>loading ...</p></div>
      }
      else {
        //  get current user logged in
        //  if no user, require log in
        let user = this.getCurrentUserLoggedIn();
        //  confirm user is expected in the session
        if (this.userIsAllowedInSession(user)) {
          //  render editor
          page = Editor.UIELement();
        }
      }
    }
    else {
      //  redirect to home page || 404 page
      page = <Redirect to={"/error"}/>
    }

    return page;
  }

  static UIELement() {
    return (
      <Grid container>
        <Grid item xs={8} sm={6} md={8}>
          <TextEditor />
        </Grid>
        <Grid item xs={4} sm={6} md={4}>
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <EditorConsole />
        </Grid>
      </Grid>
    )
  }

  isSessionIDProvided() {
    return this.props.match.params.hasOwnProperty('sessionid');
  }

  getSessionID() {
    return this.props.match.params["sessionid"];
  }

  userIsAllowedInSession(user) {
    if (!this.state.session) {
      console.error('Session is not available');
      return false;
    }
    return this.state.session.users.includes(user.id);
  }

  getEditorSession() {
    let sessionID = this.state.sessionID ? this.state.sessionID : this.getSessionID();
    fetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({sessionID: sessionID}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
        .then(response => response.json())
        //TODO: should redirect to 404 page if session is not available
        .then(result => this.setState({session: result}))
        .catch(console.error)
  }

  getCurrentUserLoggedIn() {
    //  TODO: use Firebase Auth
    return {id: 1};
  }
}

export default withStyles(styles)(Editor);
