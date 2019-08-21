const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

app.use(cors());

const { login, signup, getAuthenticatedUser } = require('./handlers/users');
const { getSessions } = require('./handlers/sessions');
const { createDocument, getDocumentsAssociatedWUserHandle } = require('./handlers/documents');
const { FBAuth} = require('./util/FBAuth');
const { db } = require('./util/admin');

app.get('/', (req, res) => {return res.send("Hello");});
// All the services that interact with User data.
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);

// All the services that interact with Session data.
app.post('/session', getSessions);

// All the services that interact with Document data.
app.post('/document', createDocument);
app.get('/documents', getDocumentsAssociatedWUserHandle);

exports.api = functions.https.onRequest(app);
