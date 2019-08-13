import * as firebase from "firebase/app";
import 'firebase/auth';
import './init';

export const logout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(resolve);
    })
};