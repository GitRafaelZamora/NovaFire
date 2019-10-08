import {
    SET_DOCUMENTS,
    SET_DOCUMENT,
    LOADING_DOCUMENT,
    SAVE_DOCUMENT,
    CREATE_DOCUMENT,
    SET_CONTENT,
    DELETE_DOCUMENT, FETCHING_DOCUMENTS, FETCHING_COMPLETE
} from "../types";
import axios from 'axios';

export const getDocument = (docID) => (dispatch) => {
    // Set UI state to loading document.
    dispatch({ type: LOADING_DOCUMENT });

    axios.get(`/document/${docID}`)
        .then((res) => {
            dispatch({
                type: SET_DOCUMENT,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(`Client Error retrieving document.`);
            console.log(err);
        });
};

export const deleteDocument = (docID) => (dispatch) => {
    console.log("DELETING: " + docID);
    dispatch({ type: LOADING_DOCUMENT });
    axios.delete('/document', { data: { docID: docID } })
        .then(res => {
            dispatch({
                type: DELETE_DOCUMENT,
                payload: docID
            })
        })
        .catch(err => {
            console.log("Error deleting document");
            console.log(err);
        });
};

export const getDocuments = () => (dispatch) => {
    // Set UI state to loading document.
    dispatch({ type: FETCHING_DOCUMENTS });
    axios.get('/documents')
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: SET_DOCUMENTS,
                payload: res.data
            });
            dispatch({ type: FETCHING_COMPLETE })
        })
        .catch((err) => {
            console.log(`Error retrieving documents.`);
            console.log(err);
        });
};

export const saveDocument = (doc) => (dispatch) => {
    console.log(doc);
    axios.post('/document/save', doc)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SAVE_DOCUMENT
            });
        })
        .catch(err => {
            console.log("Error saving document.");
            console.log(err);
        })
};

export const createDocument = (title, content, handle) => (dispatch) => {
    axios.post('/document', {title, content, handle})
        .then(res => {
            dispatch({
                type: CREATE_DOCUMENT,
                payload: res.data
            });
        })
        .catch(err => {
            console.log("Error creating document.");
            console.log(err);
        })
};

export const setContent = (content) => (dispatch) => {
    dispatch({
        type: SET_CONTENT,
        payload: content
    });
};

export const addCollaborator = (handle, docID) => {
    let collaborator = {
        handle,
        docID
    };

    axios.post('/document/addCollaborator', collaborator)
        .then(res => {
            console.log(res.data);

        })
        .catch(err => {
            console.log(err.response.data);
        });
};

