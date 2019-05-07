import React, { Component } from 'react';
import Toolbox from './components/Toolbox';
import Sandbox from './components/Sandbox.js';
import GlobalStyle from './assets/globalStyle.js';

/* eslint-disable react/prefer-stateless-function, no-unused-vars */
class App extends Component {
  constructor() {
    super();

    this.state = {
      x: 0,
      y: 0,
      SelectedElement: 'Void',
      BrushSize: '1',
      fill: false,
      play: false,
      step: false,
      save: false
    }; // placeholder
    this.selectElement = this.selectElement.bind(this);
    this.handleFill = this.handleFill.bind(this);
    this.handleStep = this.handleStep.bind(this, 'step');
    this.handlePlay = this.handlePlay.bind(this, 'play');
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave() {
    this.setState({ save: !this.state.save });
  }
  selectElement(field, evt) {
    this.setState({ [field]: evt });
  }
  handleFill(evt) {
    if (evt === 'clear') {
      this.setState({ SelectedElement: 'Void' });
    }
    this.setState({ fill: !this.state.fill });
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
        <GlobalStyle />
        <Sandbox
          element={this.state.SelectedElement}
          size={this.state.BrushSize}
          fill={this.state.fill}
          filled={this.handleFill}
          step={this.state.step}
          unStep={this.handleStep}
          play={this.state.play}
          save={this.state.save}
          unSave={this.handleSave}
        />
        <Toolbox
          selected={this.selectElement}
          fill={this.state.fill}
          toFill={this.handleFill}
          step={this.handleStep}
          play={this.handlePlay}
          playState={this.state.play}
          save={this.handleSave}
        />
      </div>
    );
  }
}

export default App;
