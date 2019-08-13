import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';

// Material UI 
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Components
import SideBar from '../organisms/SideBar'
import TextEditor from '../atoms/TextEditor'
import EditorConsole from '../atoms/editor_console'

// Firebase
import {auth} from "../../../lib/js/firebase/auth";

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
      session: null,
      user: null,
      noUserFound: false,
      noSession: false
    }
  }

  render() {

    if (this.isSessionIDProvided()) {
      if (this.state.noSession) {
        return (<Redirect to={"/error"}/>);
      }
      if (this.state.noUserFound) {
        return (
            <Redirect to={{
              pathname: '/login',
              state: {
                destination: 'editor/' + this.getSessionID()
              }
            }}/>);
      }
      if (this.state.user && this.state.session && this.userIsAllowedInSession()) {
        // send session info to socket and create socket client for user in TextEditor
        return (this.UIELement());
      }
      // show loading while fetching session info from server and user
      this.getEditorSession();
      this.getCurrentUserLoggedIn();
      return (<div><p>loading ...</p></div>);
    }
    //  redirect to home page || 404 page
    return (<Redirect to={"/error"}/>);
  }

  UIELement() {
    return (
      <Grid container>
        <Grid item xs={8} sm={6} md={8}>
          <TextEditor session={this.state.session} user={this.state.user}/>
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

  userIsAllowedInSession() {
    if (!this.state.session) {
      console.error('Session is not available');
      return false;
    }
    return this.state.session.users.includes(this.state.user.uid);
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
        .then(response => {
          if (response.status !== 200) {
            this.setState({noSession: true})
          }
          return response.json();
        })
        .then(result => this.setState({session: result}))
        .catch(console.error)
  }

  getCurrentUserLoggedIn() {
    auth().then(user => {
      this.setState({user: user})
    })
        .catch(() => {
          this.setState({noUserFound: true})
        })
  }
}

export default withStyles(styles)(Editor);
