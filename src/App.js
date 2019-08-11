import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

// Components
import Editor from './components/templates/Editor'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'
import Navbar from './components/organisms/Navbar'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

// Material UI
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  backgroundColor: '#282c34'
})

function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/editor" component={Editor} />
          </div>
        </Router>
      </Provider>
    </StylesProvider>
  );
}

export default App;
