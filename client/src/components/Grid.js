import React, { Component } from 'react';
// eslint-disable-next-line
import Cell from './Cell.js';
import styled from 'styled-components';
const OuterDiv = styled.div`
  display: inline-block;
`;
class Grid extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <OuterDiv>
        <p>Grid</p>
      </OuterDiv>
    );
  }
}

export default Grid;
