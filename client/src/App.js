import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Components
import Editor from './components/templates/Editor'
import Login from './components/atoms/Login'
import Dashboard from './components/pages/Dashboard'
import Error from './components/pages/Error'
import Navbar from './components/organisms/Navbar'
import Home from './components/pages/Home'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, logoutUser } from "./redux/actions/userActions";

// Material UI
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'
import AuthRoute from "./util/AuthRoute";

axios.defaults.baseURL = 'https://us-central1-binate-363ac.cloudfunctions.net/api';

// Check for previous Auth Token
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  // Check Token Expiration.
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch( logoutUser() );
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch( getUserData() );
  }
} else {
  console.log("No Token")
}

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});



function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login} />
            <AuthRoute exact path="/dashboard" component={Dashboard} />
            <AuthRoute exact path="/editor" component={Editor} />
            <Route path={["", "/error"]} component={Error} />
          </div>
        </Router>
      </Provider>
    </StylesProvider>
  );
}

export default App;
