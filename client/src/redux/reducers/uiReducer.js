import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI, FETCHING_DOCUMENTS, FETCHING_COMPLETE
} from '../types';

const initialState = {
    fetching_documents: undefined,
    ui_errors: undefined,
    // Deprecate old naming convention
    loading: false, // old
    error: undefined, // old
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCHING_DOCUMENTS:
            return {
                ...state,
                fetching_documents: true
            };
        case FETCHING_COMPLETE:
            return {
                ...state,
                fetching_documents: false
            };
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}