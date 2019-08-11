import React, { Component } from 'react'
// Material UI
import { withStyles } from '@material-ui/core';
// Test code stored in a file
import testcode from '../../assets/testcode'
// React Editor
import { LiveProvider, LiveEditor } from 'react-live';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const styles = theme => ({
  /* Add Component Styles Here */
})

export class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsers: [],
      history: [],
      username: null,
      code: testcode,
    }
  }

  login = () => {
    const username = this.username.value;

    if (username.trim()) {
      const data = {
        username
      };
      this.setState({
        ...data
      }, () => {
        client.send(JSON.stringify({
          ...data, 
          type: "NEW_USER_EVENT"
        }));
      });
    }
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const newState = {};


      if (data.type === "NEW_USER_EVENT") {
        newState.currentUsers = Object.values(data.data.users)
      } else if (data.type === "TEXT_CHANGE") {
        newState.code = data.data.code;
      }

      newState.history = data.data.history;
      this.setState({
        ...newState
      })
    }
  }

  updateCode = (e) => {
    client.send(JSON.stringify({
      type: "TEXT_CHANGE",
      username: this.state.username,
      code: e
    }));
  }

  render() {
    const classes = this.props.classes
    return (
      <>
      <LiveProvider code={this.state.code}  contentEditable={true}>
        <LiveEditor name="code" onChange={this.updateCode} />
      </LiveProvider>
      <input name="username" ref={(input) => { this.username = input; }} />
      <button type="button" onClick={this.login}>Join</button>
      </>
      
    )
  }
}

export default withStyles(styles)(TextEditor);
