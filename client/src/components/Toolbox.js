/* eslint-disable react/no-unused-state */
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
  position: static;
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
  display: inline-block;
  margin: 5px auto;
  width: 10em;
  height: 6em;
  background: #46a67b;
  color: white;
  border: 0.1em solid #46a67b;
  border-radius: 0.5em;
`;

const BrushBG = styled(ButtonDiv)`
  height: 2em;
  text-align: left;
  display: block;
`;
const BrushDiv = styled.div`
  position: relative;
  width: 11em;
  top: 0.3em;
  left: 0.4em;
  font-size: 14px;
`;
const BrushSizes = styled.div`
  position: relative;
  display: inline;
  top: 0.2em;
`;
const Circle0 = styled.div`
  width: 0.3em;
  height: 0.3em;
  background: white;
  border-radius: 50%;
  display: inline-block;
  margin: 0.25em;
  &:hover {
    background: #c9f0dd;
  }
`;
const Circle1 = styled(Circle0)`
  width: 0.5em;
  height: 0.5em;
`;
const Circle2 = styled(Circle0)`
  width: 0.75em;
  height: 0.75em;
`;
const Clear = styled(Button)`
  display: inline;
  width: 6em;
  font-size: 12px;
  margin: 0;
`;
const ToolbarDiv = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  height: 7em;
  background: #c9f0dd;
  border: 0.25em solid #46a67b;
  border-radius: 0.5em;
  bottom: 0em;
  left: 0em;
`;
const ElementTitle = styled.h1`
  font-size: 19px;
  margin: 7px auto 4px;
`;
const SaveDiv = styled(ButtonDiv)`
  height: 3em;
  display: block;
`;
const OptionButtons = styled(Button)`
  font-size: 1em;
  width: 4.5em;
  margin: 0.5em 3px;
`;
const BrushAndSave = styled.div`
  display: inline-block;
  position: relative;
  bottom: 0.5em;
  left: 0.5em;
`;

class Toolbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedElement: 'Void',
      BrushSize: '1'
    };
    this.handleSizeChange = this.handleBrushChange.bind(this, 'BrushSize');
    this.handleTypeChange = this.handleBrushChange.bind(
      this,
      'SelectedElement'
    );
    this.handleClear = this.handleClear.bind(this);
    this.handleFill = this.handleFill.bind(this);
  }
  handleBrushChange(field, event) {
    this.setState({ [field]: event.target.id });
    this.props.selected(field, event.target.id);
    // this is where we update the props
  }
  handleClear() {
    if (this.props.playState) {
      this.props.play();
    }
    this.props.toFill('clear');
    this.setState({ SelectedElement: 'Void' });
  }
  handleFill() {
    this.props.toFill('fill');
  }
  render() {
    const elementButton = el => {
      return (
        <Button
          type="button"
          disabled={this.state.SelectedElement === el}
          onClick={this.handleTypeChange}
          id={el}
        >
          {el}
        </Button>
      );
    };
    let runState;
    if (this.props.playState) {
      runState = 'Pause';
    } else {
      runState = 'Play';
    }
    return (
      <ToolbarDiv>
        <ButtonDiv>
          <ElementTitle>Elements</ElementTitle>
          {elementButton('Void')}
          {elementButton('Rock')}
          {elementButton('Sand')}
          {elementButton('Water')}
          <Button type="button" onClick={this.handleFill} id="fill">
            Fill
          </Button>
        </ButtonDiv>
        <BrushAndSave>
          <BrushBG>
            <BrushDiv>
              Size&emsp;
              <BrushSizes>
                <Circle0 onClick={this.handleSizeChange} id="1" />
                <Circle1 onClick={this.handleSizeChange} id="2" />
                <Circle2 onClick={this.handleSizeChange} id="3" />
                &emsp;
              </BrushSizes>
              <Clear
                type="button"
                onClick={this.handleClear} // TODO: clear method
                value="Clear"
              >
                Clear
              </Clear>
            </BrushDiv>
          </BrushBG>
          <SaveDiv>
            <OptionButtons type="button" onClick={this.props.save}>
              Save
            </OptionButtons>
            <OptionButtons type="button">Share</OptionButtons>
          </SaveDiv>
        </BrushAndSave>
        <BrushAndSave>
          <SaveDiv>
            <Button type="button" onClick={this.props.step}>
              {' '}
              Step
            </Button>
            <Button type="button" onClick={this.props.play}>
              {' '}
              {runState}
            </Button>
          </SaveDiv>
        </BrushAndSave>
      </ToolbarDiv>
    );
  }
}
Toolbox.propTypes = {
  selected: PropTypes.func.isRequired,
  saved: PropTypes.func, //TODO: prop function to save state of grid
  toFill: PropTypes.func.isRequired,
  fill: PropTypes.bool.isRequired
};

export default Toolbox;
