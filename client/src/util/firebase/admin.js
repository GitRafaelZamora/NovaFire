let admin = require("firebase-admin");

let serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://novafire-c701c.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db, admin };