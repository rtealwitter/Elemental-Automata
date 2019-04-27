import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { logic } from './Logic.js';

const Div = styled.div`
  display: inline-block;
`;

const Void = { name: 'Void', color: '#D3D3D3' };
const Rock = { name: 'Rock', color: '#A9A9A9' };
const Test = { name: 'Test', color: '#8B008B' };
const Sand = { name: 'Sand', color: '#FFF8DC' }; //will add more colors

const ElementArray = [Void, Rock, Test, Sand];

let mouseDown = false;

const speed = 250; //milliseconds between updates

class Sandbox extends Component {
  constructor() {
    super();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.clear = this.clear.bind(this);
    this.changeElement = this.changeElement.bind(this);
    this.saveGrid = this.saveGrid.bind(this);

    this.state = {
      dimension: 20,
      grid: []
    };
  }

  //to scale with changing window size
  updateDimensions() {
    const { dimension, grid } = this.state;
    //console.log(grid !== []);
    const newGrid = [];
    for (let i = 0; i < dimension; i++) {
      const newRow = [];
      for (let j = 0; j < dimension; j++) {
        newRow[j] = Object.assign(
          grid.length === 0 ? { element: 'Void', row: i, col: j } : grid[i][j],
          {
            x: (window.innerWidth / dimension) * j,
            y: (window.innerHeight / dimension) * i,
            should_update: false // will need to init as true
          }
        );
      }
      newGrid[i] = newRow;
    }
    this.setState({
      grid: newGrid
    });
  }

  //handles resize of windows and time in the world
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    this.interval = setInterval(() => {
      if (this.props.play || this.props.step) {
        const newGrid = logic(this.state.grid, this.state.dimension);
        this.setState({ grid: newGrid });
      }
      if (this.props.step) {
        this.props.unStep();
      }
    }, speed);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  saveGrid() {
    if (this.props.save) {
      const getCurDate = () => {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return yyyy + '-' + mm + '-' + dd;
      };
      const saveDate = getCurDate();
      const jsonGrid = JSON.stringify(this.state.grid);
      const newRecord = {
        title: 'test',
        author: 'Mr. JSON',
        edited: saveDate,
        sandbox: jsonGrid
      };
      fetch('/api/scenarios/', {
        method: 'POST',
        body: JSON.stringify(newRecord),
        headers: new Headers({ 'Content-type': 'application/json' })
      });
      this.props.unSave();
    }
  }
  clear() {
    const { dimension, grid } = this.state;
    const newGrid = Array.from(grid);
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        newGrid[i][j] = Object.assign(grid[i][j], {
          element: 'Void'
        });
        this.setState({ grid: newGrid });
      }
    }
    this.setState({ grid: newGrid });
    this.props.cleared('clear', !this.props.clear);
  }

  changeElement(row, col) {
    //console.log(mouseDown);
    if (mouseDown) {
      const { grid } = this.state;
      const newGrid = Array.from(grid);
      newGrid[row][col] = Object.assign(grid[row][col], {
        element: this.props.element
      });
      this.setState({ grid: newGrid });
    }
  }

  render() {
    const { dimension, grid } = this.state;
    if (this.props.save) {
      this.saveGrid();
    }
    if (this.props.clear && grid) {
      this.clear();
    }

    const renderedGrid = grid.map(row =>
      row.map(cell => (
        <Cell
          key={dimension * cell.x + cell.y}
          x={cell.x}
          y={cell.y}
          dx={window.innerWidth / dimension}
          dy={window.innerHeight / dimension}
          color={ElementArray.find(elem => elem.name === cell.element).color}
          handleChange={this.changeElement}
          row={cell.row}
          col={cell.col}
        />
      ))
    );
    return (
      <Div
        onMouseDown={() => (mouseDown = true)}
        onMouseUp={() => (mouseDown = false)}
        onMouseLeave={() => (mouseDown = false)}
      >
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>{renderedGrid}</Layer>
        </Stage>
      </Div>
    );
  }
}

Sandbox.propTypes = {
  element: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  clear: PropTypes.bool.isRequired,
  cleared: PropTypes.func.isRequired
};
export default Sandbox;
