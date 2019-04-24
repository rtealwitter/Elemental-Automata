import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

class Cell extends Component {
  constructor() {
    super();
    this.changeElement = this.changeElement.bind(this);

    this.state = {};
  }

  changeElement() {
    const { handleChange, row, col } = this.props;
    handleChange(row, col);
  }

  render() {
    const { x, y, dx, dy, color } = this.props;
    return (
      <Rect
        x={x}
        y={y}
        height={dy}
        width={dx}
        fill={color}
        onClick={this.changeElement.bind(this)}
      />
    );
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dx: PropTypes.number.isRequired,
  dy: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired
};

export default Cell;
