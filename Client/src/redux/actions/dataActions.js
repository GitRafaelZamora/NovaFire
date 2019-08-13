import { SET_HISTORY, SET_CODE, SET_CLIENT, ON_MESSAGE } from '../types';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');


export const setClient = () => (dispatch) => {

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

    newState.documentHistory = data.data.documentHistory;
    dispatch({
      type: ON_MESSAGE,
      payload: newState
    })
  }

  dispatch({
    type: SET_CLIENT,
    payload: client
  })
}

export const setCode = (code, user) => (dispatch) => {
  dispatch({ 
    type: SET_CODE, 
    payload: code 
  });
  client.send(JSON.stringify({
    type: "TEXT_CHANGE",
    username: user,
    code: code
  }));
  
}

export const setHistory = (documentHistory) => (dispatch) => {
  dispatch({ 
    type: SET_HISTORY, 
    payload: documentHistory
  });
}
