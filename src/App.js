import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

// Components
import Editor from './components/templates/Editor'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'
import Error from './components/pages/Error'

// Material UI
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router>
        <div className="App">
          <Route exact path="/login" component={Login} />
          <Route exact path={["/", "/dashboard"]} component={Dashboard} />
          <Route exact path="/editor/:sessionid" component={Editor} />
          <Route path={["", "/error"]} component={Error} />
        </div>
      </Router>
    </StylesProvider>
    
  );
}

export default App;
