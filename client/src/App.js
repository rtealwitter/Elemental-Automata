import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './App.css';
import Toolbox from './components/Toolbox';
import Sandbox from './components/Sandbox.js';

/* eslint-disable react/prefer-stateless-function, no-unused-vars */
class App extends Component {
  constructor() {
    super();

    this.state = {
      scenarioName: '',
      authorName: '',
      x: 0,
      y: 0,
      SelectedElement: 'Void',
      BrushSize: '1',
      fill: false,
      play: false,
      step: false,
      saveMode: false,
      scenarios: undefined,
      scenarioMode: undefined,
      newGrid: undefined,
      saveGrid: false
    }; // placeholder
    this.getScenarios = this.getScenarios.bind(this);
    this.changeGrid = this.changeGrid.bind(this);

    this.selectElement = this.selectElement.bind(this);
    this.handleFill = this.handleFill.bind(this);
    this.handleStep = this.handleStep.bind(this, 'step');
    this.handlePlay = this.handlePlay.bind(this, 'play');
    this.handleSave = this.handleSave.bind(this);
    this.setScenarioName = this.setScenarioName.bind(this);
    this.setAuthorName = this.setAuthorName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.unSaveGrid = this.unSaveGrid.bind(this);
  }
  handleSave() {
    this.setState({ saveMode: !this.state.saveMode });
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

  getScenarios() {
    fetch('/api/scenarios/')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ scenarios: data });
      })
      .catch(err => console.log(err)); // eslint-disable-line no-conso   le
  }

  changeGrid(id) {
    const { scenarios } = this.state;
    const result = scenarios.find(scenario => scenario.id === id);
    this.setState({ newGrid: result, scenarioMode: false });
  }

  componentDidMount() {
    this.getScenarios();
    this.setState({ scenarioMode: window.location.pathname === '/scenarios' });
  }

  setScenarioName(evt) {
    this.setState({ scenarioName: evt.target.value });
  }
  setAuthorName(evt) {
    this.setState({ authorName: evt.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault(); // prevent page reload
    // change saveGrid state to activate callback in Sandbox.js
    this.setState({ saveGrid: true });
    // revert saveMode state
    this.setState({ saveMode: !this.state.saveMode });
  }
  unSaveGrid() {
    this.setState({ saveGrid: false });
  }
  render() {
    const { x, y, scenarios, scenarioMode } = this.state;
    let scenarioView = <p>Loading scenarios... </p>;
    if (scenarios) {
      scenarioView = scenarios.map(scenario => (
        <p key={scenario.id}>
          <button onClick={() => this.changeGrid(scenario.id)}>
            {scenario.title} by {scenario.author}
          </button>
        </p>
      ));
    }

    const inScenarioView = scenarioMode && scenarios !== undefined;

    return (
      <div className="App">
        {inScenarioView && scenarioView}
        {!inScenarioView && (
          <div>
            <Modal
              isOpen={this.state.saveMode}
              toggle={this.handleSave}
              centered
              backdrop
            >
              <ModalHeader>Save This Scenario</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="scenarioName">Scenario Name</Label>
                    <br />
                    <Input
                      type="text"
                      name="scenarioName"
                      id="scenarioName"
                      placeholder="Enter a name for the scenario"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="authorName">Author Name</Label>
                    <br />
                    <Input
                      type="text"
                      name="authorName"
                      id="authorName"
                      placeholder="Enter your name"
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.handleSave}>Submit</Button>
                <Button onClick={this.handleSave}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <Sandbox
              element={this.state.SelectedElement}
              size={this.state.BrushSize}
              fill={this.state.fill}
              filled={this.handleFill}
              step={this.state.step}
              unStep={this.handleStep}
              play={this.state.play}
              newGrid={this.state.newGrid}
              scenarios={this.state.scenarios}
              save={this.state.save}
              unSave={this.handleSave}
              saveGrid={this.state.saveGrid}
              unSaveGrid={this.unSaveGrid}
              scenarioName={this.state.scenarioName}
              authorName={this.state.authorName}
            />
            <Toolbox
              selected={this.selectElement}
              fill={this.state.fill}
              toFill={this.handleFill}
              step={this.handleStep}
              play={this.handlePlay}
              playState={this.state.play}
              saveMode={this.handleSave}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
