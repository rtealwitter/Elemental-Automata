import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { logic } from './Logic.js';

const Div = styled.div`
  display: inline-block;
`;

const Void = { name: 'Void', color: ['#D3D3D3', '#D3D3D3', '#D3D3D3'] };
const Rock = { name: 'Rock', color: ['#b9b9b9', '#aaaaaa', '#9b9b9b'] };
const Water = { name: 'Water', color: ['#2391e1', '#2383d2', '#217ac3'] };
const Sand = { name: 'Sand', color: ['#ffdb70', '#f5d16f', '#ebc362'] };
const Fire = { name: 'Fire', color: ['#e21500', '#e15100', '#c30600'] };

const ElementArray = [Void, Rock, Water, Sand, Fire];

let mouseDown = false;

const speed = 250; //milliseconds between updates

class Sandbox extends Component {
  constructor() {
    super();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.fill = this.fill.bind(this);
    this.changeElement = this.changeElement.bind(this);
    this.saveGrid = this.saveGrid.bind(this);
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
            x: (window.innerWidth / dimension) * j,
            // hack-y fix
            y: ((window.innerHeight - 120) / dimension) * i,
            shouldUpdate: false // will need to init as true
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
      // Handle 'edited' field
      const getCurDate = () => {
        const today = new Date();
        return today.toISOString();
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
    if (mouseDown) {
      const { grid } = this.state;
      const newGrid = Array.from(grid);
      if (this.props.size > 1) {
        // will act the same for size 2 and size 3 to reduce redundencies
        if (row > 0) {
          // will do up always
          if (col < this.state.dimension - 1) {
            newGrid[row - 1][col + 1] = Object.assign(grid[row - 1][col + 1], {
              // up and right
              element: this.props.element
            });
            newGrid[row][col + 1] = Object.assign(grid[row][col + 1], {
              // right
              element: this.props.element
            });
          }
          newGrid[row - 1][col] = Object.assign(grid[row - 1][col], {
            // up
            element: this.props.element
          });
        } else {
          if (col < this.state.dimension - 1) {
            // else just right
            newGrid[row][col + 1] = Object.assign(grid[row][col + 1], {
              // right
              element: this.props.element
            });
          }
        }
      }
      if (this.props.size > 2) {
        // does not handle up and right to reduce redundencies
        if (row < this.state.dimension - 1) {
          // will do down always
          if (col < this.state.dimension - 1) {
            newGrid[row + 1][col + 1] = Object.assign(grid[row + 1][col + 1], {
              // down and right
              element: this.props.element
            });
          }
          if (col > 0) {
            // will do left and left down always
            newGrid[row + 1][col - 1] = Object.assign(grid[row + 1][col - 1], {
              // left down
              element: this.props.element
            });
            newGrid[row][col - 1] = Object.assign(grid[row][col - 1], {
              // left
              element: this.props.element
            });
            if (row > 0) {
              newGrid[row - 1][col - 1] = Object.assign(
                grid[row - 1][col - 1],
                {
                  // left up
                  element: this.props.element
                }
              );
            }
          }
          newGrid[row + 1][col] = Object.assign(grid[row + 1][col], {
            // down
            element: this.props.element
          });
        }
        if (row === this.state.dimension - 1 && col > 0) {
          // does left and left up (opposite of dimension 2)
          newGrid[row - 1][col - 1] = Object.assign(grid[row - 1][col - 1], {
            element: this.props.element
          });
          newGrid[row][col - 1] = Object.assign(grid[row][col - 1], {
            element: this.props.element
          });
        }
      }
      newGrid[row][col] = Object.assign(grid[row][col], {
        // always do clicked cell
        element: this.props.element
      });
      this.setState({ grid: newGrid });
    }
  }

  randColor(element) {
    return element.color[Math.floor(Math.random() * 3)];
  }

  render() {
    const { dimension, grid } = this.state;
    if (this.props.save) {
      this.saveGrid();
    }
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
  fill: PropTypes.bool.isRequired,
  filled: PropTypes.func.isRequired
};
export default Sandbox;
