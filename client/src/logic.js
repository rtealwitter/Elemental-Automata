import React from 'react';

const Void = { name: 'Void', color: '#D3D3D3' };
const Rock = { name: 'Rock', color: '#A9A9A9' };
const Test = { name: 'Test', color: '#8B008B' };
const Sand = { name: 'Sand', color: '#FFF8DC' }; //will add more colors

const ElementArray = [Void, Rock, Test, Sand];

function logic(grid) {
  for (let i = dimension - 1; i >= 0; i--) {
    for (let j = dimension - 1; j >= 0; j--) {
      let current = grid[j][i];
      if (current.element === 'Void') {
        //do probably nothing?
      } else if (current.element === 'Rock') {
        //also do probably nothing
      }
      if (current.element === 'Sand') {
        //just have to check if it needs to fall
        if (grid[j][i - 1].element === 'Void') {
          //fall down
          grid[j][i - 1].element = 'Sand';
          grid[j][i - 1].should_update = true;
          current.element = 'Void';
          current.should_update = true;
        }
      }
    }
  }

  return grid;
}
