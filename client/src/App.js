import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Material UI
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

// Components
import Editor from './components/templates/Editor'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Dashboard from './components/pages/Dashboard'
import Navbar from './components/organisms/Navbar'
import Home from './components/pages/Home'
import AuthRoute from "./util/AuthRoute";

// Redux
import store from './redux/store'
import { Provider } from 'react-redux'
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, logoutUser } from "./redux/actions/userActions";

axios.defaults.baseURL = 'https://us-central1-novafire-c701c.cloudfunctions.net/api';

// Check for previous Auth Token
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  // Check Token Expiration.
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch( logoutUser() );
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch( getUserData() );
  }
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
            <Route path="/signup" component={Signup} />
            <AuthRoute exact path="/dashboard" component={Dashboard} />
            <AuthRoute path="/editor" component={Editor} />
          </div>
        </Router>
      </Provider>
    </StylesProvider>
  );
}

export default App;
