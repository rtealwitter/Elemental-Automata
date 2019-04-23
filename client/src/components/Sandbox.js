/* eslint-disable prefer-template, no-unused-vars, no-const-assign*/
import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Div = styled.div`
  display: inline-block;
`;

const Void = { name: 'Void', color: '#D3D3D3' };
const Rock = { name: 'Rock', color: '#A9A9A9' };
const Test = { name: 'Test', color: '#8B008B' };

const ElementArray = [Void, Rock, Test];

let addElement = false;

class Sandbox extends Component {
  constructor() {
    super();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.onSandboxClick = this.onSandboxClick.bind(this);
    this.onSandboxDown = this.onSandboxDown.bind(this);

    this.state = {
      dimension: 20,
      grid: [],
      width: null,
      height: null,
      x: 0,
      y: 0 // hold last clicked location
    };
  }

  //to scale with changing window size
  updateDimensions() {
    const { dimension, grid } = this.state;

    //console.log(window.innerHeight);
    //const oldGrid = this.state.grid;
    const newGrid = [];
    for (let i = 0; i < dimension; i++) {
      const newRow = [];
      for (let j = 0; j < dimension; j++) {
        newRow[j] = Object.assign(
          {
            x: (window.innerWidth / dimension) * j,
            y: (window.innerHeight / dimension) * i
          },
          grid ? { element: 'Void' } : grid[i][j]
        );
      }
      newGrid[i] = newRow;
    }
    this.setState({
      grid: newGrid,
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onSandboxDown(e) {
    addElement = true;
    this.onSandboxClick(e);
  }

  onSandboxClick(e) {
    // handle click
    //console.log(addElement);
    if (addElement) {
      const { dimension, grid, width, height } = this.state;
      const newGrid = Array.from(grid);
      let targetX = Math.floor((e.screenX * dimension) / width);
      let targetY = Math.floor(((e.screenY - 100) * dimension) / height);
      //console.log(targetX);
      //console.log(targetY);
      if (targetY > dimension) {
        targetY = dimension;
      }
      if (targetX > dimension) {
        targetX = dimension;
      }
      newGrid[targetY][targetX] = Object.assign(grid[targetY][targetX], {
        element: this.props.element
      });
      this.setState({ grid: newGrid, x: e.screenX, y: e.screenY });
    }
  }

  render() {
    const { dimension, grid, x, y } = this.state;
    // onMouseMove is alternative for onMouseDown
    return (
      <Div
        onMouseMove={this.onSandboxClick}
        onMouseDown={this.onSandboxDown.bind(this)}
        onMouseUp={() => (addElement = false)}
        onMouseLeave={() => (addElement = false)}
      >
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {grid.map(row =>
              row.map(cell => (
                <Cell
                  key={dimension * cell.x + cell.y}
                  x={cell.x}
                  y={cell.y}
                  dx={window.innerWidth / dimension}
                  dy={window.innerHeight / dimension}
                  color={
                    ElementArray.find(elem => elem.name === cell.element).color
                  }
                />
              ))
            )}
          </Layer>
        </Stage>
      </Div>
    );
  }
}

Sandbox.propTypes = {
  element: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};
export default Sandbox;
