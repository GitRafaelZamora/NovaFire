import { SET_HISTORY, SET_CONTENT, SET_CLIENT, ON_MESSAGE, SET_SESSION } from '../types';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

export const setClient = (session) => (dispatch) => {
  const client = new W3CWebSocket('ws://127.0.0.1:8000');
  // Uncomment to use preexisting server
  // const client = new W3CWebSocket('ws://localhost:5000/');

  client.onopen = () => {
    console.log('WebSocket Client Connected');
    dispatch({
      type: ON_MESSAGE,
      payload: session
    });
    // client.send(JSON.stringify({
    //   type: SET_SESSION,
    //   session: session
    // }));
  };

  // on message received from websocket server
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
    });

    // dispatch({
    //   type: SET_CLIENT,
    //   payload: client
    // });

  };

  return client;
};

export const setContent = (content, user) => (dispatch) => {
    dispatch({
      type: SET_CONTENT,
      payload: content
    });
};

  export const setHistory = (documentHistory) => (dispatch) => {
    dispatch({
      type: SET_HISTORY,
      payload: documentHistory
    });
  };
