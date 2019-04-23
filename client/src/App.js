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
      BrushSize: '1',
      clear: false
    }; // placeholder
    this.selectElement = this.selectElement.bind(this);
    this.handleClear = this.handleClear.bind(this, 'clear');
  }
  selectElement(field, evt) {
    this.setState({ [field]: evt });
  }
  handleClear(field, evt) {
    if (evt) {
      this.setState({ [field]: !this.state.clear });
    }
  }
  render() {
    const { x, y } = this.state;
    return (
      <div className="App">
        <Sandbox
          element={this.state.SelectedElement}
          size={this.state.BrushSize}
          clear={this.state.clear}
          cleared={this.handleClear}
        />
        <Toolbox
          selected={this.selectElement}
          clear={this.state.clear}
          toClear={this.handleClear}
        />
      </div>
    );
  }
}

export default App;
