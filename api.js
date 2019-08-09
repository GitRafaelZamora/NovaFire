// serve data from database

const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const path = require('path');

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


module.exports = router;