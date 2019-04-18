/* eslint-disable prefer-template */
import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Cell from './Cell.js';
import styled from 'styled-components';

const Div = styled.div`
  display: inline-block;
`;

//# of rows:
const dimension = 100;

class Sandbox extends Component {
  constructor() {
    super();
    this.initGrid = this.initGrid.bind(this);
    this.state = {
      grid: this.initGrid(window.innerHeight),
      diameter: window.innerHeight
    };
  }

  initGrid(diameter) {
    //const dimension = this.props.size;
    const grid = [];

    for (let i = 0; i < dimension; i++) {
      const row = [];
      for (let j = 0; j < dimension; j++) {
        row[j] = [(diameter / dimension) * j, (diameter / dimension) * i];
      }
      grid[i] = row;
    }
    return grid;
  }

  //to scale with changing window size
  updateDimensions() {
    let update_diameter = window.innerHeight;
    let grid = this.state.grid;
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        grid[j][i] = [
          (update_diameter / dimension) * j,
          (update_diameter / dimension) * i
        ];
      }
    }
    this.setState({
      diameter: update_diameter
    });
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
      <Div>
        <Stage width={this.state.diameter} height={this.state.diameter}>
          <Layer>
            {grid.map(row =>
              row.map(cell => (
                <Cell
                  x={cell[0]}
                  y={cell[1]}
                  d={this.state.diameter / dimension}
                  //color = {'#af600ee'}
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
