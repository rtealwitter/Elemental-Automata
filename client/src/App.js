import React, { Component } from 'react';
import './App.css';
import Toolbox from './components/Toolbox';
import Sandbox from './components/Sandbox.js';

/* eslint-disable react/prefer-stateless-function, no-unused-vars */
class App extends Component {
  constructor() {
    super();

    this.state = {
      x: 0,
      y: 0,
      SelectedElement: 'Void',
      BrushSize: '5'
    }; // placeholder
    this.selectElement = this.selectElement.bind(this);
  }
  selectElement(field, evt) {
    this.setState({ [field]: evt });
  }
  render() {
    const { x, y } = this.state;
    return (
      <div className="App">
        <Sandbox element={this.state.SelectedElement} size={5} />
        <Toolbox selected={this.selectElement} />
      </div>
    );
  }
}

export default App;
