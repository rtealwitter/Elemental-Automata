import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Text } from 'react-konva';
import Cell from './Cell.js';

class Sandbox extends Component {
  constructor() {
    super();
    this.state = { grid: null };
    this.initGrid = this.initGrid.bind(this);
  }
  initGrid() {
    let grid = [];
    for (let i = 0; i < this.props.size; i++) {
      let row = [];
      for (let j = 0; i < this.props.size; j++) {
        row[j] = [100 * j, 100 * i];
      }
      grid[i] = row;
    }
    return grid;
  }
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try to drag a star" />
          {[...Array(10)].map(i => (
            <Cell
              id={i}
              x={Math.random() * window.innerWidth}
              y={Math.random() * window.innerHeight}
              d={50}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

render(<Sandbox />, document.getElementById('root'));
export default Sandbox;
