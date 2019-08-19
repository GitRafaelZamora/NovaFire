const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');
const firebase = require('./firebase');

router.get('/', (request, response) => {
    response.send('Connected to the API')
});

router.post('/session', (request, response) => {
    let result = {};

    if (!request.body.sessionID) {
        result.error = "Provide session id! {sessionid: 'id' [String]}";
        return response.status(400).send(result);
    }

    //TODO: connect to firebase database
    let databasePath = path.join(__dirname, '/database/sessions.json');
    let sessionid = request.body.sessionid.toString();
    jsonfile.readFile(databasePath)
        .then(sessions =>{
            let session = sessions.find(session => session.id === sessionid);
            if (!session) {
                result.error = "Session ID provided is not valid";
                response.status(400).send(result);
            }
            result.session = session;
            response.status(200).send(result);
        })
        .catch(error => {
            console.error(error);
            result.error = "Internal Server Error: " + error;
            response.status(400).send(result);
        })
});

router.post('/createUser', (request, response) => {
    function validateNewUser(user) {
        if (!user) return user;
        return user.hasOwnProperty('email') &&
            user.hasOwnProperty('password') &&
            user.hasOwnProperty('emailVerified') &&
            user.hasOwnProperty('displayName')
    }

    let result = {};

    if (!request.body.user) {
        result.error = "Provide user! {user: {} [Object]}";
        return response.status(400).send(result);
    }
    if (!validateNewUser(request.body.user)) {
        result.error = "Provided user is missing one of the following parameters: email, password, emailVerified, displayName";
        return response.status(400).send(result);
    }

    firebase.createUser(request.body.user)
        .then(() => {
            result.message = `Successfully created user: ${request.body.user.displayName}`;
            response.send(result)
        })
        .catch(error => response.status(400).send({error}));
});

router.post('/verifyLoginToken', (request, response) => {
    let result = {};

    if (!request.body.token) {
        result.error = "Provide token! {token: 'token' [String]}";
        return response.status(400).send(result);
    }

    firebase.verifyToken(request.body.token)
        .then(uid => response.status(200).send({uid}))
        .catch(error => {
            console.error(error);
            response.status(400).send(error);
        });
});

// Handle login.
router.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const { errors, valid } = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            // if (err.code === 'auth/wrong-password') {
            //     return res.status(403).json({ general: 'Wrong Credentials, please try again.' });
            // }
            console.log(err);
            return res.status(403).json({ general: 'Wrong credentials, please try again' });
        });
});


module.exports = router;