import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logic from './Logic.js';
import change from './change.js';

const Div = styled.div`
  display: inline-block;
  position: fixed;
  left: 0;
  top: 0;
`;

const Void = { name: 'Void', color: ['#ffffff', '#ffffff', '#ffffff'] };
const Rock = { name: 'Rock', color: ['#b9b9b9', '#aaaaaa', '#9b9b9b'] };
const Water = { name: 'Water', color: ['#2391e1', '#2383d2', '#217ac3'] };
const Sand = { name: 'Sand', color: ['#ffdb70', '#f5d16f', '#ebc362'] };
const Fire = { name: 'Fire', color: ['#e21500', '#e15100', '#c30600'] };

const ElementArray = [Void, Rock, Water, Sand, Fire];

let mouseDown = false;

const speed = 250; //milliseconds between updates

function assignDimensions(dimension, grid) {
  const newGrid = [];
  for (let i = 0; i < dimension; i++) {
    const newRow = [];
    for (let j = 0; j < dimension; j++) {
      newRow[j] = Object.assign(
        grid.length === 0 ? { element: 'Void', row: i, col: j } : grid[i][j],
        {
          x: (window.innerWidth / dimension) * j,
          // hack-y fix
          y: ((window.innerHeight - 180) / dimension) * i
        }
      );
    }
    newGrid[i] = newRow;
  }
  return newGrid;
}

class Sandbox extends Component {
  constructor() {
    super();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.fill = this.fill.bind(this);
    this.changeElement = this.changeElement.bind(this);
    this.randColor = this.randColor.bind(this);

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
            x: (window.innerWidth / dimension) * j - 175,
            // hack-y fix
            y: (window.innerHeight / dimension) * i
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
    if (window.location.pathname !== '/') {
      fetch('/api/scenarios' + window.location.pathname) // eslint-disable-line prefer-template
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(data => {
          const newGrid = JSON.parse(data[0].sandbox);
          this.setState({
            dimension: newGrid.length,
            grid: assignDimensions(newGrid.length, newGrid)
          });
        })
        .catch(err => console.log(err)); // eslint-disable-line no-console
    }

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

  // saveGrid() {
  //   if (this.props.save) {
  //     // // Handle 'edited' field
  //     const getCurDate = () => {
  //       const today = new Date();
  //       return today.toISOString();
  //     };
  //     const saveDate = getCurDate();
  //     const jsonGrid = JSON.stringify(this.state.grid);
  //     const newRecord = {
  //       title: 'test',
  //       author: 'Mr. JSON',
  //       edited: saveDate,
  //       sandbox: jsonGrid
  //     };
  //     fetch('/api/scenarios/', {
  //       method: 'POST',
  //       body: JSON.stringify(newRecord),
  //       headers: new Headers({ 'Content-type': 'application/json' })
  //     });
  //     this.props.unSave();
  //   }
  // }
  fill() {
    const { dimension, grid } = this.state;
    const newGrid = Array.from(grid);
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        newGrid[i][j] = Object.assign(grid[i][j], {
          element: this.props.element
        });
      }
    }
    this.setState({ grid: newGrid });
    this.props.filled('fill');
  }

  changeElement(row, col) {
    const { dimension, grid } = this.state;
    const { size, element } = this.props;
    const newGrid = change(row, col, grid, size, dimension, element, mouseDown);
    this.setState({ grid: newGrid });
  }

  randColor(element) {
    return element.color[Math.floor(Math.random() * 3)];
  }

  render() {
    const { dimension, grid } = this.state;
    if (this.props.fill && grid) {
      this.fill();
    }

    const renderedGrid = grid.map(row =>
      row.map(cell => (
        <Cell
          key={dimension * cell.x + cell.y}
          x={cell.x}
          y={cell.y}
          dx={window.innerWidth / dimension}
          dy={window.innerHeight / dimension}
          color={this.randColor(
            ElementArray.find(elem => elem.name === cell.element)
          )}
          handleChange={this.changeElement}
          row={cell.row}
          col={cell.col}
          element={ElementArray.find(elem => elem.name === cell.element)}
        />
      ))
    );
    return (
      <Div
        onMouseDown={() => (mouseDown = true)}
        onMouseUp={() => (mouseDown = false)}
        onMouseLeave={() => (mouseDown = false)}
      >
        <Stage width={window.innerWidth - 175} height={window.innerHeight}>
          <Layer>{renderedGrid}</Layer>
        </Stage>
      </Div>
    );
  }
}

Sandbox.propTypes = {
  element: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  fill: PropTypes.bool.isRequired,
  filled: PropTypes.func.isRequired
};
export default Sandbox;
