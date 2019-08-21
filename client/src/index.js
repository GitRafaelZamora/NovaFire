import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDAe_-LMFcWfyH2-mTuPXx2VkFbAvL9VJ4",
    authDomain: "binate-363ac.firebaseapp.com",
    databaseURL: "https://binate-363ac.firebaseio.com",
    projectId: "binate-363ac",
    storageBucket: "binate-363ac.appspot.com",
    messagingSenderId: "782168087462",
    appId: "1:782168087462:web:c332c32beed02c1e"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
