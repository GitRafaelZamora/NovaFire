let admin = require("firebase-admin");

let serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://binate-363ac.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db, admin };