const WebSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer().listen(8000);

const wsServer = new WebSocketServer({
  httpServer: server
});

const clients = {};
const users = {};
let code = null;
let documentHistory = [];


const broadcast = (json) => {
  Object.keys(clients).map( (client) => {
    clients[client].sendUTF(json);
  });
}

const TYPES = {
  NEW_USER_EVENT: "NEW_USER_EVENT",
  TEXT_CHANGE: "TEXT_CHANGE"
}

// Generate a UID for each user
const getUID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
}

wsServer.on('request', (request) => {
  var uid = getUID();
  console.log( ( new Date() ) +  ' Recieved a new connection from origin ' +  request.origin + '.');

  // Accept connection
  const connection = request.accept(null, request.origin);
  clients[uid] = connection;
  console.log('Connected: ' + uid + ' in ' + Object.getOwnPropertyNames(clients));

  connection.on('message', (message) => {
    console.log("Message recieved")
    if (message.type == 'utf8') {
      const data = JSON.parse(message.utf8Data)
      const json = { type: data.type };
      // New user connected
      if (data.type === TYPES.NEW_USER_EVENT) {
        users[uid] = data;
        documentHistory.push(`${data.username} joined the document session.`);
        json.data = { users, documentHistory };
      } 
      // User updated text editor document
      else if (data.type === TYPES.TEXT_CHANGE) {
        console.log(data.code)
        code = data.code;
        json.data = { code, documentHistory };
      }

      broadcast(JSON.stringify(json));
    } else {
      console.log("not utf")
    }
    console.log("Out here ")
  })

  connection.on('close', (connection) => {
    console.log( ( new Date() ) + " Peer " + uid + " disconnected.");
    const json = { type: TYPES.USER_EVENT };
    if (users[uid]) {
      documentHistory.push(`${users[uid].username} left the document session.`)
      json.data = { users, documentHistory };
      delete clients[uid];
      delete users[uid];
    } else {
      documentHistory.push(`${uid} left the document session.`)
      delete clients[uid];
    }
    broadcast(JSON.stringify(json));
  })
})
