
let admin = require("firebase-admin");
let path = require('path');

let serviceAccount = require(path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS));

class Firebase {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://binate-d936a.firebaseio.com"
        });
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            admin.auth().createUser(user)
                .then(function(userRecord) {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log('Successfully created new user:', userRecord.uid);
                    resolve();
                })
                .catch(function(error) {
                    console.log('Error creating new user:', error);
                    reject();
                });
        })
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            admin.auth().verifyIdToken(token)
                .then(function(decodedToken) {
                    let uid = decodedToken.uid;
                    resolve(uid);
                }).catch(reject);
        })
    }
}

module.exports = new Firebase();