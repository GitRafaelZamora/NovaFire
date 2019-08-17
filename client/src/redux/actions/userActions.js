import {
    SET_USER,
    CLEAR_ERRORS,
    SET_ERRORS,
    LOADING_USER,
    LOADING_UI,
    SET_UNAUTHENTICATED
} from '../types';
import axios from 'axios';

export const loginUser = (user, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return { token };
        })
        .catch(err => {
            // if (err.code === 'auth/wrong-password') {
            //     return res.status(403).json({ general: 'Wrong Credentials, please try again.' });
            // }
            console.log(err);
            return { error: 'Wrong credentials, please try again' };
        });

    // axios.post('/login', user)
    //     .then((res) => {
    //         setAuthorizationHeader(res.data.token);
    //         dispatch( getUserData() );
    //         dispatch({ type: CLEAR_ERRORS });
    //         history.push('/');
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: SET_ERRORS,
    //             payload: err.response.data
    //         });
    //     });
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
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

// Stores a temporary Authorization token in axios.
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};