import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbox from './components/Toolbox';
import Sandbox from './components/Sandbox.js';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Automata</h1>
        </header>
        <Toolbox />
        <Sandbox size={5} />
      </div>
    );
  }
}

export default App;
