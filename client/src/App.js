import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid.js';
import Toolbox from './components/Toolbox';
import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Automata</h1>
        </header>
        <Grid />
        <Toolbox />
      </div>
    );
  }
}

export default App;
