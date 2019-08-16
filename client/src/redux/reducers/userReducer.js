import {
    SET_USER,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_AUTHENTICATED,
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
};

export default function( state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                loading: true,
                authenticated: true,
                credentials: action.payload,
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}