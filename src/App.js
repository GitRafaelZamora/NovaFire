import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

// Components
import Editor from './components/Editor'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/editor" component={Editor} />
      </div>
    </Router>
    
  );
}

export default App;
