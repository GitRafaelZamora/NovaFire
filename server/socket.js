const EVENTS = {
  ENTER_SESSION: "ENTER_SESSION",
  TEXT_CHANGE: "TEXT_CHANGE",
  SESSION_ENDED: "SESSION_ENDED",
  LEAVE_SESSION: "LEAVE SESSION"
};

function EditorSocket(server) {
  const WebSocketServer = require('websocket').server;
  this.wsServer = new WebSocketServer({
    httpServer: server
  });
  this.sessions = {};

  this.listen = () => {
    this.wsServer.on('connect', (connection) => {
      console.log('New Client connected to socket');
    });

    this.wsServer.on('request', (request) => {
      const connection = request.accept(null, request.origin);

      connection.on('message', (message) => {
        //TODO: research how to handle different types of messages received
        if (message.type === 'utf8') {
          const data = JSON.parse(message.utf8Data);
          let response;

          switch (data.type) {
            case EVENTS.ENTER_SESSION:
              response = addUserConnectionToSession(connection, data);
              break;
            case EVENTS.SESSION_ENDED:
              response = stopTrackingSession(data);
              break;
            case EVENTS.TEXT_CHANGE:
              response = updateCodeForSession(data);
              break;
            case EVENTS.LEAVE_SESSION:
              response = removeUserFromSession(data);
              break;
            default:
              response.error = `Provide a valid event type. Supported events are ${Object.values(EVENTS)}`
          }

          broadcast(connection, JSON.stringify(response));

        } else {
          connection.send(JSON.stringify({
            error: "Message type must be 'utf8' for text frames."
          }))
        }
      });

      connection.on('close', (reason, description) => {
        if (description && description instanceof Object) {
          let data = JSON.parse(description);
          if (data.hasOwnProperty('sessionid') && data.hasOwnProperty('uid')) {
            removeUserFromSession({
              sessionid: data.sessionid,
              uid: data.uid
            });
          }
        }
      })

    });
  };

  let broadcast = (connection, response) => {
    if (response.hasOwnProperty('sessionid')) {
      let session = this.sessions[response.sessionid.toString()];
      Object.values(session.live_users).filter(user => user.connection.connected)
          .map(user => {
            user.connection.send(JSON.stringify(response));
          });
    }
    connection.send(JSON.stringify(response));
  };

  let addUserConnectionToSession = (connection, data) => {
    let response = {type: data.type};

    if (!data.hasOwnProperty('session') && !data.hasOwnProperty('uid')) {
      response.error = `Provide a 'session' and 'uid'.`;
      return response;
    }
    if (data.hasOwnProperty('session') && !(data.session instanceof Object)) {
      response.error = `Provide an object for 'session'`;
      return response;
    }
    if (!data.session.hasOwnProperty('id')) {
      response.error = `Provide a session 'id' for session`;
      return response;
    }

    if (!this.sessions.hasOwnProperty(data.session.id.toString())) {
      this.sessions[data.session.id.toString()] = data.session;
    }
    // session references the object in this.sessions & changes to this.sessions will persist when function ends
    let session = this.sessions[data.session.id.toString()];

    if (!session.hasOwnProperty('live_users')) session.live_users = {};

    session.live_users[data.uid.toString()] = {id: data.uid.toString(), connection};

    response.message = `Successfully added user '${data.uid}' to session '${session.id}'`;
    return response;
  };

  let stopTrackingSession = (data) => {
    let response = {type: data.type};

    if (!data.hasOwnProperty('sessionid')) {
      response.error = `Provide session id.`;
      return response;
    }

    delete this.sessions[data.sessionid];

    response.message = `Successfully ended session ${data.sessionid}`;
    return response;
  };

  let updateCodeForSession = (data) => {
    let response = {type: data.type};

    if (!data.hasOwnProperty('sessionid') && !data.hasOwnProperty('uid')) {
      response.error = `Provide session id and user id`;
      return response;
    }
    if (!data.hasOwnProperty('code')) {
      response.error = `Provide code to update with.`;
      return response;
    }

    this.session[data.sessionid.toString()].code = data.code;

    response.message = `Successfully update code.`;
    return response;
  };

  let removeUserFromSession = (data) => {
    let response = {type: data.type};

    if (data.hasOwnProperty('sessionid') && data.hasOwnProperty('uid')) {
      delete this.sessions[data.sessionid.toString()].live_users[data.uid.toString()];
      response.message = `Successfully removed user '${data.uid.toString()}' from session '${data.sessionid}'`;
      response.sessionid = data.sessionid.toString();
      return response;
    }

    response.error = `Provide session id and user id.`;
    return response;
  }
}

module.exports = EditorSocket;