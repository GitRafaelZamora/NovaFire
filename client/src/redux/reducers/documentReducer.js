import {
    SET_DOCUMENT_ID,
    ADD_DOCUMENT_USER,
    REMOVE_DOCUMENT_USER,
    SET_DOCUMENT,
    LOADING_DOCUMENT,
} from '../types';

const initialState = {
    documentID: null,
    document: null,
    documents: [],
    users: [],
    loading: false,
};

export default function( state = initialState, action) {
    switch (action.type) {
        case SET_DOCUMENT_ID:
            return {
                ...state,
            };
        case ADD_DOCUMENT_USER:
            return {
                ...state,
            };
        case REMOVE_DOCUMENT_USER:
            return {
                ...state,
            };
        case SET_DOCUMENT:
            return {
                ...state,
            };
        case LOADING_DOCUMENT:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}