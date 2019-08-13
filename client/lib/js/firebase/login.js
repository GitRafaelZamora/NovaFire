import * as firebase from "firebase/app";
import 'firebase/auth';
import './init';

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(`code: ${errorCode}\nMessage: ${errorMessage}`);
                reject(errorCode);
        }).then(resolve)
    })
};