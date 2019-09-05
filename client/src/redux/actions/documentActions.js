import {
    SET_DOCUMENTS,
    SET_DOCUMENT,
    LOADING_DOCUMENT,
    SAVE_DOCUMENT,
    CREATE_DOCUMENT
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

export const getDocuments = () => (dispatch) => {
    // Set UI state to loading document.
    dispatch({ type: LOADING_DOCUMENT });
    axios.get('/documents')
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: SET_DOCUMENTS,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(`Error retrieving document.`);
            console.log(err);
        });
};

export const saveDocument = (doc) => (dispatch) => {
    dispatch({ type: SAVE_DOCUMENT });
    axios.post('/document/save', doc)
        .then(res => {
            dispatch({
                type: SET_DOCUMENT,
                payload: res.data
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