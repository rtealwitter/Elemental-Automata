import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';

class Sandbox extends Component {
  constructor() {
    super();
    this.initGrid = this.initGrid.bind(this);
    this.state = {
      grid: this.initGrid(),
      diameter: window.innerHeight
    };
  }

  initGrid() {
    //const dimension = this.props.size;
    const dimension = 200;
    const grid = [];

    for (let i = 0; i < dimension; i++) {
      const row = [];
      for (let j = 0; j < dimension; j++) {
        row[j] = [
          (window.innerHeight / 200) * j,
          (window.innerHeight / 200) * i
        ];
      }
      grid[i] = row;
    }
    return grid;
  }

  //to scale with changing window size
  updateDimensions() {
    let update_diameter = window.innerHeight;
    this.setState({ diameter: update_diameter });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    const { grid } = this.state;
    return (
      <Stage width={this.state.diameter} height={this.state.diameter}>
        <Layer>
          {grid.map(row =>
            row.map(cell => (
              <Cell
                x={cell[0]}
                y={cell[1]}
                d={this.state.diameter / 200}
                color={'#' + (((1 << 24) * Math.random()) | 0).toString(16)}
              />
            ))
          )}
        </Layer>
      </Stage>
    );
  }
}

export default Sandbox;
