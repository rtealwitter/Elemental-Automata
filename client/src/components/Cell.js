import React, { Component } from 'react';
//import Konva from 'konva';
//import { render } from 'react-dom';
import { Rect } from 'react-konva';

class Cell extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        height={this.props.d}
        width={this.props.d}
        fill="#89b717"
      />
    );
  }
}

export default Cell;
