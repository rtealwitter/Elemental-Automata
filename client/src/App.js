import React, { Component } from 'react';
import './App.css';
import Toolbox from './components/Toolbox';
import Sandbox from './components/Sandbox.js';

/* eslint-disable react/prefer-stateless-function, no-unused-vars */
class App extends Component {
  constructor() {
    super();

    this.state = { x: 0, y: 0 }; // placeholder
  }

  render() {
    const { x, y } = this.state;
    return (
      <div className="App">
        <Sandbox size={5} />
        <Toolbox />
      </div>
    );
  }
}

export default App;
