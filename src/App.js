import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

// Components
import Editor from './components/pages/Editor'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/editor" component={Editor} />
      </div>
    </Router>
    
  );
}

export default App;
