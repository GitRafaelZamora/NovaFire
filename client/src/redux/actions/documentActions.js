import {
    SET_DOCUMENTS,
    LOADING_DOCUMENT
} from "../types";
import axios from 'axios';

export const getDocument = (docID) => (dispatch) => {
    // Set UI state to loading document.
    dispatch({ type: LOADING_DOCUMENT });
    axios.post('api/document', docID)
        .then((res) => {
            dispatch({
                type: SET_DOCUMENT,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(`Error retrieving document.`);
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
