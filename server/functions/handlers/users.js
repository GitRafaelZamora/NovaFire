const firebase = require('firebase');
const {admin, db} = require('../util/admin');
const config = require('../util/config');
firebase.initializeApp(config);


const { validateSignUpData, validateLoginData } = require('../util/validators');

// TODO: Write API Documentation in ../swagger.json
// NOTE: Feel free to rewrite logic. if it does not work with Postman or the React client.git
exports.signup = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    console.log("Signing up : " + user.handle);

    let tid, uid;
    const { valid, errors } = validateSignUpData(user);

    if (!valid) return res.status(400).json(errors);

    db.doc(`/users/${user.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'This handle is already taken.' })
            } else {
                return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            }
        })
        .then(data => {
            uid = data.user.uid;
            return data.user.getIdToken();
        })
        .then(token => {
            tid = token;
            const userCredentials = {
                handle: user.handle,
                email: user.email,
                createAt: new Date().toISOString(),
                uid: uid
            };
            return db.doc(`/users/${user.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token: tid });
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use.' });
            } else {
                return res.status(500).json({ error: err.code });
            }
        });
};
// TODO: Write API Documentation in ../swagger.json
exports.login = (req, res) => {
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
};
// TODO: Write API Documentation in ../swagger.json
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};

    db.doc(`/users/${req.user.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                res.status(200).json(userData);
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err.code })
        })
};