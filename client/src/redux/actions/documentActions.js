import {
    SET_DOCUMENT,
    LOADING_DOCUMENT
} from "../types";
import axios from 'axios';

export const getDocument = () => (dispatch) => {
    // Set UI state to loading document.
    dispatch({ type: LOADING_DOCUMENT });
    axios.post('api/document')
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
