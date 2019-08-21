const firebase = require('firebase');
const {admin, db} = require('../util/admin');

// TODO: Create One document
exports.createDocument = (req, res) => {
    const document = {
        challenge: req.body.challenge,
        text: req.body.text,
    };

    // Create a new document reference.
    let docRef = db.collection("documents").doc();

    let docID = docRef.id;

    // Add a new document in collection "documents"
    docRef.set(document)
        .then(() => {
            res.status(200).json({ msg: "Document successfully written!" });
            console.log("Document successfully written!");
            const collaborator = {
                handle: req.body.handle,
                docID: docID,
            };
            // TODO: Need to add the creator to "collaborator" collection
            db.collection('collaborators').doc().set(collaborator)
                .then(() => {
                    res.status(200).json({ msg: "Collaborator successfully written!" });
                    console.log("Collaborator successfully written!");
                })
                .catch(err => {
                    console.error("Error writing collaborator: ", err);
                    res.status(500).json({ error: err.code });
                })
        })
        .catch(err => {
            console.error("Error writing document: ", err);
            res.status(500).json({ error: err.code });
        });


};

// TODO: Get one document on click type of thang.
// exports.getDocument = (req, res) => {
//     const docID = req.body.docID;
//
//     db.ref(`/documents/${docID}`).once('value')
//         .then(snapshot => {
//             return res.status(200).json({ document: snapshot.val() });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err.code });
//         });
// };

exports.getDocumentsAssociatedWUserHandle = (req, res) => {
    let userData = {};

    db.doc(`/users/${req.user.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                // TODO: Get Documents
                return db.collection('collaborators')
                    .where('handle', '==', req.user.handle)
                    .orderBy('createAt', 'desc')
                    .limit(10)
                    .get();
            }
        })
        .then(data => {
            userData.documents = [];
            data.forEach(doc => {
                userData.documents.push(doc.data());
            });
            return res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err.code });
        });
};