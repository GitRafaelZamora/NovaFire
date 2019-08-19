const firebase = require('firebase');
const { admin, db } = require('../util/admin');
const jsonfile = require('jsonfile');
const path = require('path');

exports.getSessions = (request, response) => {
    let session = {
        id: request.body.sessionID,
    };

    if (!request.body.sessionID) {
        result.error = "Provide session id! {sessionid: 'id' [String]}";
        return response.status(400).send(result);
    }

    db.doc(`/sessions/${session.sessionID}`).get()
        .then(doc => {
            if (doc.exists) {
                console.log(doc);
                return res.status(400).json({ message: "Session found." })
            } else {
                console.log(doc);
                return res.status(400).json({ message: "Session not found." })
            }
        });
};