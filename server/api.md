# APIs
___

## Route
* Method
* Input
* Response.status
* Response.json

___
## `/api/` 
* GET 
* None
* 200 
* "Connected to the API" [String]

## `api/session`
* POST
* {sessionid: "id" [String]} [Object]
* 200 | 400
* 200:

  {id: "id" [String], users: ["uid"] [Array[String]], code: "code" [String] }
  
  400:
  
  {error: "error" [String]}

## `/api/verifyLoginToken/`
* POST
* {token: "token" [String]}
* 200 | 400
* 200:

   {uid: "id" [String]}
   
   400:
   
   {error: "error"}
   
# Chat (socket.io)

## Client side
```javascript
let socket = io()
// name of chat room is the same as the id of the session/document 
let chatroom = 'sessionid'

// first, join the user into the chat room
socket.emit('join room', chatroom);

// send message to everyone in the chat room
let sendButton = document.querySelector('button.send');
// on send button clicked
sendButton.addEventListener('click', () => {
    let data = {
        // provide room name
        room: chatroom,
        // provide message to send
        message: "user typed in this message",
        // provide sender's [name | id | email]
        sender: user.name
    };
    socket.emit('new message', data)
});

// receive message from others in the chat room
socket.on('new message', data => {
    // add message to chat component
    addNewMessageToChat(data.message, data.sender);    
})
```