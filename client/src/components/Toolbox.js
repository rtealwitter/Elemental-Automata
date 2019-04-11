import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  font-size: 0.8em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
  background: #46a67b;
  color: white;
  border: 0.15em solid white;
  border-radius: 0.5em;
  position: relative;
  &:hover {
    background: white;
    color: #46a67b;
    border: 0.15em solid #46a67b;
  }
  &:disabled {
    background: white;
    color: #46a67b;
    border: 0.15em solid #46a67b;
  }
`;
const ButtonDiv = styled.div`
  position: relative;
  margin: 5px auto;
  width: 10em;
  height: 6.5em;
  background: #46a67b;
  color: white;
  border: 0.1em solid #46a67b;
  border-radius: 0.5em;
`;

const BrushOptions = styled(ButtonDiv)`
  height: 2em;
`;
const Circle0 = styled.div`
  width: 10px;
  height: 10px;
  background: black;
  border-radius: 50%;
  display: inline-block;
`;
const P = styled.p`
  position: relative;
  height: 1em;
  width: 8em;
  right: 2em;
  bottom: 0.5em;
`;

const ToolbarDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 11em;
  height: 20em;
  background: #c9f0dd;
  border: 0.25em solid #46a67b;
  border-radius: 0.5em;
  left: 5em;
`;
const ElementTitle = styled.h1`
  font-size: 19px;
  margin: 10px auto 4px;
`;
const SaveDiv = styled(ButtonDiv)`
  height: 3em;
`;
const OptionButtons = styled(Button)`
  font-size: 1em;
  width: 4.5em;
  margin: 0.5em 3px;
`;

class Toolbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedElement: null,
      BrushSize: 10
    };
    this.handleSizeChange = this.handleBrushChange.bind(this, 'BrushSize');
    this.handleTypeChange = this.handleBrushChange.bind(
      this,
      'SelectedElement'
    );
  }
  handleBrushChange(field, event) {
    this.setState({ [field]: event.target.value });
    // this is where we update the props
  }
  render() {
    return (
      <ToolbarDiv>
        <ButtonDiv>
          <ElementTitle>Elements</ElementTitle>
          <Button
            type="button"
            disabled={this.state.SelectedElement === 'Element0'}
            onClick={this.handleTypeChange}
            value="Element0"
          >
            Element0
          </Button>
          <Button
            disabled={this.state.SelectedElement === 'Element1'}
            type="button"
            onClick={this.handleTypeChange}
            value="Element1"
          >
            Element1
          </Button>
          <Button
            type="button"
            onClick={this.handleTypeChange}
            value="Element2"
          >
            Element2
          </Button>
          <Button
            type="button"
            onClick={this.handleTypeChange}
            value="Element3"
          >
            Element3
          </Button>
        </ButtonDiv>
        <BrushOptions>
          <P>
            &#128396;
            <Circle0 />
          </P>
        </BrushOptions>
        <SaveDiv>
          <OptionButtons type="button">Save</OptionButtons>
          <OptionButtons type="button">Share</OptionButtons>
        </SaveDiv>
      </ToolbarDiv>
    );
  }
}
Toolbox.propTypes = {
  selected: PropTypes.func, // TODO: prop function to pass element selected up to app?
  saved: PropTypes.func //TODO: prop function to save state of grid
};

export default Toolbox;
