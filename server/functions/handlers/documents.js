const firebase = require('firebase');
const {admin, db} = require('../util/admin');

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
exports.getDocument = (req, res) => {
    const docID = req.body.docID;

    db.collection('documents').doc(docID).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Document not found."})
            } else {
                return res.status(200).json(doc.data());
            }
        })
        .catch(err => {
            console.log("Error retrieving document.");
            console.log(err);
            res.status(500).json({ error: err.code });
        });
};

exports.saveDocument = (req, res) => {
    let document = req.body.document;
    let docID = req.body.docID;

    let docRef = db.collection('documents').doc(docID);

    let merge = docRef.set(document, { merge: true });

    merge
        .then(() => {
        res.status(200).json({ msg: "Document saved."})
        })
        .catch(err => {
            res.status(500).json({ error: "Document could not be saved." });
        });
};

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