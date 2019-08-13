import * as firebase from "firebase/app";
import "firebase/auth";
import './init';

export const auth = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.auth().currentUser.getIdToken()
                    .then(token => {
                        fetch('/api/verifyLoginToken', {
                            method: 'POST',
                            body: JSON.stringify({token: token}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                if (response.status !== 200) {
                                    reject();
                                }
                            })
                            .then(() => {
                                resolve(user);
                            })
                    });
            }
            else reject()
        });

    })
};

