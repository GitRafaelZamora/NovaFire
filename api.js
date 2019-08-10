// serve data from database

const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');
const firebase = require('./firebase');

router.get('/', (request, response) => {
    response.send('Connected to the API')
});

router.post('/session', (request, response) => {
    if (!request.body.sessionID) {
        response.status(400);
        response.send();
    } else {
        let databasePath = path.join(__dirname, '/database/sessions.json');
        let sessionID = request.body.sessionID;
        jsonfile.readFile(databasePath)
            .then(sessions =>{
                let session = sessions.find(sesh => sesh.id === parseInt(sessionID));
                session ? response.status(200) : response.status(400);
                response.send(session);
            })
            .catch(error => {
                console.error(error);
                response.status(400);
                response.send()
            })
    }
});

router.post('/createUser', (request, response) => {
    function validateNewUser(user) {
        if (!user) return user;
    /*
        {
            email: 'user@example.com',
            emailVerified: false,
            phoneNumber: '+11234567890',
            password: 'secretPassword',
            displayName: 'John Doe',
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false
        }
     */
    return user.hasOwnProperty('email') &&
        user.hasOwnProperty('password') &&
        user.hasOwnProperty('emailVerified') &&
        user.hasOwnProperty('displayName')
    }

    if (validateNewUser(request.body.user)) {
        firebase.createUser(request.body.user)
            .then(() => response.send)
            .catch(() => badRequest(response));
    } else badRequest(response)
});

function badRequest(response) {
    response.status(400);
    response.send();
}

module.exports = router;