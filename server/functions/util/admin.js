const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

const adminConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://novafire-c701c.firebaseio.com"
};

// Initialize Firebase
admin.initializeApp(adminConfig);
const db = admin.firestore();

module.exports = { db, admin };