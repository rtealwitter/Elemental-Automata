/* eslint-disable prefer-template, no-unused-vars, no-const-assign*/
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

class Sandbox extends Component {
  constructor() {
    super();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.onSandboxClick = this.onSandboxClick.bind(this);

    this.state = {
      dimension: 20,
      grid: [],
      x: 0,
      y: 0 // hold last clicked location
    };
  }

  onSandboxClick(e) {
    // handle click
    const { dimension, grid } = this.state;
    const newGrid = Array.from(grid);
    let targetX = Math.floor((e.screenX * dimension) / window.innerWidth);
    let targetY = Math.floor(
      ((e.screenY - 100) * dimension) / window.innerHeight
    );
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
            y: (window.innerHeight / dimension) * i,
            should_update: false
          },
          grid ? { element: 'Void' } : grid[i][j]
        );
      }
      newGrid[i] = newRow;
    }
    this.setState({
      grid: newGrid
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const { dimension, grid, x, y } = this.state;
    // onMouseMove is alternative for onMouseDown
    return (
      <Div onMouseDown={this.onSandboxClick}>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {grid.map(row =>
              row.map(cell => (
                <Cell
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
