/* eslint-disable prefer-template, no-unused-vars */
import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';
import styled from 'styled-components';

const Div = styled.div`
  display: inline-block;
`;

const Void = { name: 'void', color: '#D3D3D3' };
const Rock = { name: 'rock', color: '#A9A9A9' };
const ElementArray = [Void, Rock];

class Sandbox extends Component {
  constructor() {
    super();

    this.updateDimensions = this.updateDimensions.bind(this);
    this.onSandboxClick = this.onSandboxClick.bind(this);

    this.state = {
      dimension: 100,
      grid: [],
      x: 0,
      y: 0 // hold last clicked location
    };
  }

  onSandboxClick(e) {
    const { dimension, grid } = this.state;
    const newGrid = Array.from(grid);
    const targetX = e.screenX / dimension;
    const targetY = e.screenY / dimension;
    this.setState({ x: e.screenX, y: e.screenY });
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
          grid ? { element: 'void' } : grid[i][j]
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
    return (
      <Div onClick={this.onSandboxClick}>
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
        <h1>
          Coordinates: {x} {y}{' '}
        </h1>
      </Div>
    );
  }
}

export default Sandbox;
