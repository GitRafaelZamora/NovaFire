import {
    SET_DOCUMENT,
    LOADING_DOCUMENT,
    SET_DOCUMENTS,
    CREATE_DOCUMENT,
    SAVE_DOCUMENT,
    SET_CONTENT,
    DELETE_DOCUMENT
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
                loading: true,
                activeDocument: action.payload,
            };
        case SAVE_DOCUMENT:
            return {
                ...state,
            };
        case SET_CONTENT:
            const prevActiveDocument = state.activeDocument;
            return {
                ...state,
                activeDocument: {
                    ...prevActiveDocument,
                    content: action.payload,
                }
            };
        case SET_DOCUMENTS:
            return {
                ...state,
                loading: false,
                documents: action.payload,
            };
        case LOADING_DOCUMENT:
            return {
                ...state,
                loading: true,
            };
        case CREATE_DOCUMENT:
            return {
                ...state,
                documents: [...state.documents, action.payload]
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                loading: false,
                documents: state.documents.filter(value => { return value.docID !== action.payload })
            };
        default:
            return state;
    }
}