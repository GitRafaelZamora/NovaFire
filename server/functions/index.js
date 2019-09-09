const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// NOTE: Should we protect /api-docs with Authentication?
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

const { login, signup, getAuthenticatedUser } = require('./handlers/users');
const { createDocument, getDocument, getDocumentsAssociatedWUserHandle, saveDocument, deleteDocument } = require('./handlers/documents');
const { FBAuth } = require('./util/FBAuth');
const { db } = require('./util/admin');


app.get('/', (req, res) => {return res.send("Hello");});
// All the services that interact with User data.
app.post('/user/signup', signup);
app.post('/user/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);
// All the services that interact with Document data.
app.get('/documents', FBAuth, getDocumentsAssociatedWUserHandle);
app.get('/document/:docID', getDocument);
app.delete('/document', deleteDocument);
app.post('/document', createDocument);
app.post('/document/save', saveDocument);

exports.api = functions.https.onRequest(app);