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
      clear: false,
      play: false,
      step: false
    }; // placeholder
    this.selectElement = this.selectElement.bind(this);
    this.handleClear = this.handleClear.bind(this, 'clear');
    this.handleStep = this.handleStep.bind(this, 'step');
    this.handlePlay = this.handlePlay.bind(this, 'play');
  }
  selectElement(field, evt) {
    this.setState({ [field]: evt });
  }
  handleClear(field, evt) {
    if (evt) {
      this.setState({ [field]: !this.state.clear });
    }
  }
  handleStep(field) {
    this.setState({ [field]: !this.state.step });
  }
  handlePlay(field) {
    this.setState({ [field]: !this.state.play });
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
          step={this.state.step}
          unStep={this.handleStep}
          play={this.state.play}
        />
        <Toolbox
          selected={this.selectElement}
          clear={this.state.clear}
          toClear={this.handleClear}
          step={this.handleStep}
          play={this.handlePlay}
          playState={this.state.play}
        />
      </div>
    );
  }
}

export default App;
