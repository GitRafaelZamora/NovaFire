const firebase = require('firebase');
const {admin, db} = require('../util/admin');

exports.createDocument = (req, res) => {
    const document = {
        content: req.body.content,
        title: req.body.title,
        collaborators: [req.body.handle],
    };

    // Create a new document reference.
    let docRef = db.collection("documents").doc();
    let docID = docRef.id;

    // Add a new document in collection "documents"
    docRef.set({...document, docID: docID})
        .then(() => {
            console.log("Document successfully written!");
            const collaborator = {
                handle: req.body.handle,
                docID: docID,
            };
            // add the creator to "collaborator" collection
            db.collection('collaborators').doc().set(collaborator)
                .then((doc) => {
                    res.status(200).json({ ...document, docID });
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

exports.getDocument = (req, res) => {
    const docID = req.params.docID;

    db.collection('documents').doc(docID).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Document not found."})
            } else {
                return res.status(200).json({
                    ...doc.data(),
                    docID: docID,
                });
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

    let docRef = db.collection('documents').doc(document.docID);

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
    let user = {};
    let documents = [];
    let textDocumentID = '';

    db.doc(`/users/${req.user.handle}`).get()
        .then(fireUser => {
            if (fireUser.exists) {
                user.credentials = fireUser.data();
                // TODO: Get Documents
                console.log("req.user.handle: " + req.user.handle);
                return db.collection('collaborators').where('handle', '==', req.user.handle).get()
            }
        })
        .then(collaboratingIDs => {
            if (collaboratingIDs.empty) {
                console.log("User has no documents");
                return res.status(404).json({ error: "User has no documents" });
            } else {
                let apply = [];
                collaboratingIDs.forEach(relation => {
                    console.log('\t' + relation.id, '=>', relation.data());
                    textDocumentID = relation.data().docID;
                    // Get a document.
                    apply.push(db.collection('documents').doc(textDocumentID).get());
                });
                console.log(apply);
                Promise.all(apply)
                    .then(textDocument => {
                        console.log("\t\ttextDocument");
                        textDocument.forEach(document => {
                            documents.push({...document.data(), docID: document.id});
                        });
                    })
                    .then(() => {
                    return res.status(200).json(documents);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log("Promise Error");
                    })
            }
        })
        .catch(err => {
            console.log("Error retrieving document.");
            console.log(err);
            res.status(500).json({ error: err.code });
        })
};

exports.deleteDocument = (req, res) => {
    let response = [];

    db.collection('documents').doc(req.body.docID).delete()
        .then(() => {
            console.log("Document deleted");
            db.collection('collaborators').where('docID', '==', req.body.docID).get()
                .then(collaboratingDocuments => {
                    collaboratingDocuments.forEach(relation => {
                        db.collection('collaborators').doc(relation.id).delete()
                            .then(() => {
                                res.status(200).json({msg: "Successfully deleted document."})
                            });
                    });
                })
                .catch(err => {
                    console.log(err);
                    console.log("Error deleting collaborator relations.");
                });
        })
        .catch(err => {
            console.log(err);
            console.log("Error deleting document");
        });
};