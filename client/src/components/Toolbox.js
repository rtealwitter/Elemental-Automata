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
  height: 5em;
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
    this.handleSizeChange = this.handleBrushChange.bind(this, 'BrushSize');
    this.handleTypeChange = this.handleBrushChange.bind(
      this,
      'SelectedElement'
    );
    this.handleClear = this.handleClear.bind(this);
    this.handleFill = this.handleFill.bind(this);
    this.set = this.set.bind(this);
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
  set(state) {
    this.setState(state);
  }
  render() {
    const { play, step, toFill, selected } = this.props;
    const { handleClear, set } = this;

    const elementButton = el => {
      return (
        <button
          disabled={this.state.SelectedElement === el}
          onClick={this.handleTypeChange}
          id={el}
        >
          {el}
        </button>
      );
    };
    const elementList = ['Void', 'Rock', 'Sand', 'Water', 'Fire', 'Plant']; // Put new elements here
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
                id={parseInt(this.state.BrushSize) - 1}
              >
                -
              </button>
              <button>{this.state.BrushSize}</button>
              <button
                onClick={this.handleSizeChange}
                id={parseInt(this.state.BrushSize) + 1}
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
  toFill: PropTypes.func.isRequired,
  fill: PropTypes.bool.isRequired
};

export default Toolbox;
