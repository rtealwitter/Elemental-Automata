import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';

class Sandbox extends Component {
  constructor() {
    super();
    this.initGrid = this.initGrid.bind(this);

    this.state = { grid: this.initGrid() };
  }

  initGrid() {
    //const dimension = this.props.size;
    const dimension = 3;
    const grid = [];
    for (let i = 0; i < dimension; i++) {
      const row = [];
      for (let j = 0; j < dimension; j++) {
        row[j] = [100 * j, 100 * i];
      }
      grid[i] = row;
    }
    return grid;
  }

  render() {
    const { grid } = this.state;
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {grid.map(row =>
            row.map(cell => <Cell x={cell[0]} y={cell[1]} d={50} />)
          )}
        </Layer>
      </Stage>
    );
  }
}

export default Sandbox;