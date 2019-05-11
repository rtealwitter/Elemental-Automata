/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const OuterDiv = styled.div`
  display: inline-block;
  position: fixed;
  top: 0;
  right: 0;
  width: 14em;
  height: 100%;
  margin: 0 auto;
  background: seagreen;
  color: white;
`;
const ElementDiv = styled.div`
  display: block;
  position: relative;
  align-content: center;
  top: 0;
  margin: 1em 0;
  width: 12em;
  height: 7em;
`;
const ElementTitle = styled.h1`
  font-size: 20px;
  margin: auto;
`;
const Button = styled.button`
  margin: 0 0.2em;
`;
const BrushSizes = styled.div`
  position: relative;
  display: inline;
  top: 0.2em;
`;
const ButtonDiv = styled(ElementDiv)`
  margin: 0.25em 0;
`;
const SizeDiv = styled(ElementDiv)`
  height: 2em;
  margin: auto;
  top: 0.25em;
`;
const SavePlayDiv = styled(SizeDiv)`
  margin: 0.5em auto;
`;
class Toolbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedElement: 'Rock',
      BrushSize: '1'
    };
    this.handleSizeChange = this.handleSizeChange.bind(this, 'BrushSize');
    this.handleTypeChange = this.handleTypeChange.bind(this, 'SelectedElement');
    this.handleClear = this.handleClear.bind(this);
    this.handleFill = this.handleFill.bind(this);
    this.set = this.set.bind(this);
  }
  handleSizeChange(field, event) {
    let newSize = event.target.value;
    if (newSize <= 0) {
      newSize = 1;
    }
    if (newSize >= 10) {
      newSize = 10;
    }
    this.setState({ [field]: newSize });
    this.props.selected(field, newSize);
  }
  handleTypeChange(field, event) {
    this.setState({ [field]: event.target.value });
    this.props.selected(field, event.target.value);
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
  set(state) {
    this.setState(state);
  }
  render() {
    const { play, step, toFill, selected } = this.props;
    const { handleClear, set } = this;

    const elementButton = el => {
      return (
        <button
          type="button"
          name="elementButton"
          disabled={this.state.SelectedElement === el}
          onClick={this.handleTypeChange}
          key={el}
          value={el}
        >
          {el}
        </button>
      );
    };
    const elementList = [
      'Void',
      'Rock',
      'Sand',
      'Water',
      'Fire',
      'Plant',
      'Oil',
      'Wood'

    ]; // Put new elements here
    const buttonList = elementList.map(el => {
      return elementButton(el);
    });

    let runState;
    if (this.props.playState) {
      runState = '▉';
    } else {
      runState = '►';
    }

    document.onkeypress = function(e) {
      if (['p', 'P'].includes(e.key)) {
        play();
      }
      if (['s', 'S'].includes(e.key)) {
        step();
      }
      if (['f', 'F'].includes(e.key)) {
        toFill('fill');
      }
      if (['c', 'C'].includes(e.key)) {
        handleClear();
        set({ SelectedElement: 'Void' });
      }
      if (Number.isInteger(parseInt(e.key))) {
        const index = parseInt(e.key);
        if (index < elementList.length) {
          set({ SelectedElement: elementList[index] });
          selected('SelectedElement', elementList[index]);
        }
      }
    };
    return (
      <OuterDiv>
        <Col sm={{ size: 'auto' }}>
          <ElementDiv>
            <ElementTitle>Elements</ElementTitle>
            <ButtonDiv>{buttonList}</ButtonDiv>
          </ElementDiv>
          <SizeDiv>
            &emsp;
            <BrushSizes>
              <button
                onClick={this.handleSizeChange}
                value={parseInt(this.state.BrushSize) - 1}
              >
                -
              </button>
              <button disabled>{this.state.BrushSize}</button>
              <button
                onClick={this.handleSizeChange}
                value={parseInt(this.state.BrushSize) + 1}
              >
                +
              </button>
              &emsp;
            </BrushSizes>
            <Button type="button" onClick={this.handleFill} value="fill">
              Fill
            </Button>
          </SizeDiv>
          <SavePlayDiv>
            <Button type="button" onClick={this.props.saveMode}>
              Save
            </Button>
            <Button type="button">Share</Button>
          </SavePlayDiv>
          <SavePlayDiv>
            <Button type="button" onClick={this.props.step}>
              {'►|'}
            </Button>
            <Button type="button" onClick={this.props.play}>
              {runState}
            </Button>
            <Button type="button" onClick={this.handleClear} id="Clear">
              Clear
            </Button>
          </SavePlayDiv>
        </Col>
      </OuterDiv>
    );
  }
}
Toolbox.propTypes = {
  selected: PropTypes.func.isRequired,
  fill: PropTypes.bool,
  toFill: PropTypes.func.isRequired,
  step: PropTypes.func,
  play: PropTypes.func,
  playState: PropTypes.bool,
  saveMode: PropTypes.func
};

export default Toolbox;
