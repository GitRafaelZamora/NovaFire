const firebase = require('firebase');
const { admin, db } = require('../util/admin');

exports.createDocument = (req, res) => {
    const document = {
        content: req.body.content,
        title: req.body.title,
        collaborators: [req.body.handle],
    };

    // Create a new document reference.
    let docRef = db.collection("documents").doc();
    let docID = docRef.id;
    let result;
    result = {
        ...document,
        docID: docID,
    };

    // Add a new document in collection "documents"
    docRef.set({ ...document, docID: docID})
        .then(() => {
            console.log("Document successfully written!");
            const collaborator = {
                handle: req.body.handle,
                docID: docID,
            };
            // add the creator to "collaborator" collection
            db.collection('collaborators').doc().set(collaborator)
                .then(() => {
                    console.log("Collaborator successfully written!");
                    return res.status(200).json({ ...document, docID });
                })
                .catch(err => {
                    console.error("Error writing collaborator: ", err);
                    return res.status(500).json({ error: err.code });
                });
            return "documents Line 38"
        })
        .catch(err => {
            console.error("Error writing document: ", err);
            res.status(500).json({ error: err.code });
        });
};

exports.addCollaborator = (req, res) => {
    let collaborator = {
        docID: req.body.docID,
        handle: req.body.handle
    };
    db.collection('collaborators').doc()
        .set(collaborator)
        .then(doc => {
            return res.status(200).json({ msg: "Successfully added collaborator." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error adding Collaborator." })
        });
    // Get reference to document we are adding a collaborator to.
    let docRef = db.collection('documents').doc(req.body.docID);
    let collaborators;

    docRef.get()
        // eslint-disable-next-line promise/always-return
        .then(doc => {
            let document = doc.data();
            console.log("document");
            collaborators = document.collaborators;
            collaborators.push(req.body.handle);
        })
        // eslint-disable-next-line promise/always-return
        .then(() => {
            docRef.set({collaborators: collaborators}, { merge: true })
                .then(doc => {
                    return res.status(200).json({ msg: "Successfully added collaborator." });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Error adding Collaborator." })
                });
        })
        .catch(err => {
            console.log("Error document");
            console.log(err);
            return res.status(500).json({ error: "Error getting document collaborators." })
        });
};

getDocumentData = (docID) => {
    let status, data;
    db.collection('documents').doc(docID).get()
        // eslint-disable-next-line promise/always-return
        .then(doc => {
            status = 200;
            data = doc.data();
        })
        .catch(err => {
            console.log(err);
            status = 500;
            data = { error: "Error getting document." };
        });
    return ;
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
    let document = req.body;
    let docID = req.body.docID;

    let docRef = db.collection('documents').doc(document.docID);

    let merge = docRef.set(document);

    merge.then(() => {
            return res.status(200).json({ msg: "Document saved." });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Document could not be saved." });
        });
};

exports.getDocumentsAssociatedWUserHandle = (req, res) => {
    let user = {};
    let documents = [];
    let textDocumentID = '';
    console.log("GETTING USER: ")
    console.log(req.user.handle);
    db.doc(`/users/${req.user.handle}`).get()
        .then(fireUser => {
            // eslint-disable-next-line promise/always-return
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
                console.log(collaboratingIDs);
                collaboratingIDs.forEach(relation => {
                    console.log('\t' + relation.id, '=>', relation.data());
                    textDocumentID = relation.data().docID;
                    // Get a document.
                    apply.push(db.collection('documents').doc(textDocumentID).get());
                });
                console.log(apply);
                Promise.all(apply)
                // eslint-disable-next-line promise/always-return
                    .then(textDocument => {
                        // console.log("\t\ttextDocument");
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
                        return res.status(500).json({ error: "Error getting users documents." })
                    });
                return "line 125 document"
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
                // eslint-disable-next-line promise/always-return
                .then(collaboratingDocuments => {
                    collaboratingDocuments.forEach(relation => {
                        db.collection('collaborators').doc(relation.id).delete()
                            .then(() => {
                                return res.status(200).json({msg: "Successfully deleted document."})
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({ error: "Error deleting document" })
                            });
                    });
                })
                .catch(err => {
                    console.log(err);
                    console.log("Error deleting collaborator relations.");
                });
            return "Line 154 document";
        })
        .catch(err => {
            console.log(err);
            console.log("Error deleting document");
        });
};

