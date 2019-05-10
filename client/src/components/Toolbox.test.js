/* eslint-disable no-native-reassign */
import React from 'react';
import { mount } from 'enzyme';
import Toolbox from './Toolbox';
import { findButton } from '../setupTests';

describe('Toolbox Styled Components and PropTypes', () => {
  describe('PropTypes', () => {
    test('Has PropTypes defined', () => {
      // This is not a React "prop", but a JS property
      expect(Toolbox).toHaveProperty('propTypes');
    });
  });
});

describe('Toolbox Test', () => {
  let toolbox;
  const completeCallback = jest.fn();
  beforeEach(() => {
    completeCallback.mockReset();
    toolbox = mount(
      <Toolbox toFill={completeCallback} selected={completeCallback} />
    );
  });
  describe('Element Tests', () => {
    test('Toolbox has element buttons', () => {
      const button = findButton(toolbox, /elementButton/i);
      expect(button.exists()).toBe(true);
    });
    test('Clicking element button invokes callback', () => {
      const button = findButton(toolbox, /sand/i);
      button.simulate('click');
      expect(completeCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Clear Test', () => {
    test('Toolbox has Clear button', () => {
      const button = findButton(toolbox, /clear/i);
      expect(button.exists()).toBe(true);
    });
    test('Clicking CLear button invokes callback', () => {
      const button = findButton(toolbox, /clear/i);
      button.simulate('click');
      expect(completeCallback).toHaveBeenCalledTimes(1);
    });
  });
});
