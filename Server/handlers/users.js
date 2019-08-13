const firebase = require('firebase');
const {admin, db} = require('../util/admin');
const config = require('../util/config');
firebase.initializeApp(config);

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }


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
            // } // Can catch all errors firebase api throws here with switch statement.
            console.log(err);
            return res.status(403).json({ general: 'Wrong credentials, please try again' });
        });

}