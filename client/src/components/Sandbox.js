/* eslint-disable prefer-template */
import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';
import styled from 'styled-components';

const Div = styled.div`
  display: inline-block;
`;

class Sandbox extends Component {
  constructor() {
    super();
    this.initGrid = this.initGrid.bind(this);

    this.state = { grid: this.initGrid() };
  }

  initGrid() {
    //const dimension = this.props.size;
    const dimension = 300;
    const grid = [];
    for (let i = 0; i < dimension; i++) {
      const row = [];
      for (let j = 0; j < dimension; j++) {
        row[j] = [2 * j, 2 * i];
      }
      grid[i] = row;
    }
    return grid;
  }

  render() {
    const { grid } = this.state;
    return (
      <Div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {grid.map(row =>
              row.map(cell => (
                <Cell
                  x={cell[0]}
                  y={cell[1]}
                  d={2}
                  color={'#' + (((1 << 24) * Math.random()) | 0).toString(16)}
                />
              ))
            )}
          </Layer>
        </Stage>
      </Div>
    );
  }
}

export default Sandbox;
