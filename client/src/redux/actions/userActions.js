import {
    SET_USER,
    CLEAR_ERRORS,
    SET_ERRORS,
    LOADING_USER,
    LOADING_UI,
    SET_UNAUTHENTICATED
} from '../types';
import axios from 'axios';
import { useHistory } from 'react-router'

export const loginUser = (user, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/user/login', user)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch( getUserData() );
            dispatch({ type: CLEAR_ERRORS });
            // Redirect
            history.push("/dashboard");
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const signup = (user) => (dispatch) => {
    console.log("Signing in");
    console.log(user);
    axios.post('/user/signup', user)
        .then((res) => {
            console.log(res);
            setAuthorizationHeader(res.data.token);
            dispatch( getUserData() );
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch(err => {
            console.log("Error setting user.");
            console.log(err);
        })
};

export const logoutUser = () => (dispatch) => {
    deleteAuthorizationHeader();
    dispatch({ type: SET_UNAUTHENTICATED });
};

// Stores a temporary Authorization token in axios.
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

const deleteAuthorizationHeader = () => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
};