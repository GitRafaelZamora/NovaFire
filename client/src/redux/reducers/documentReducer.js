import {
    SET_DOCUMENT,
    LOADING_DOCUMENT,
    SET_DOCUMENTS
} from '../types';

const initialState = {
    activeDocument: null,
    documents: [],
    loading: true,
};

export default function( state = initialState, action) {
    switch (action.type) {
        case SET_DOCUMENT:
            return {
                ...state,
                activeDocument: action.payload,
            };
        case SET_DOCUMENTS:
            return {
                ...state,
                documents: action.payload,
                loading: false,
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