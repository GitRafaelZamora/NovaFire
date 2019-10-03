const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// NOTE: Should we protect /api-docs with Authentication?
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

const { login, signup, getAuthenticatedUser } = require('./handlers/users');
const {
    createDocument,
    getDocument,
    getDocumentsAssociatedWUserHandle,
    saveDocument,
    deleteDocument,
    addCollaborator
} = require('./handlers/documents');
const { FBAuth } = require('./util/FBAuth');
const { db } = require('./util/admin');


app.get('/', (req, res) => {return res.send("Hellos");});

// User Routes
app.post('/user/signup', signup);
app.post('/user/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);

// Document Routes
app.get('/documents', FBAuth, getDocumentsAssociatedWUserHandle);
app.get('/document/:docID', getDocument);
app.post('/document', createDocument);
app.post('/document/save', saveDocument);
app.post('/document/addCollaborator', addCollaborator);
app.delete('/document', deleteDocument);

exports.api = functions.https.onRequest(app);