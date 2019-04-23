//import React from 'react';

const Void = { name: 'Void', color: '#D3D3D3' };
const Rock = { name: 'Rock', color: '#A9A9A9' };
const Test = { name: 'Test', color: '#8B008B' };
const Sand = { name: 'Sand', color: '#FFF8DC' }; //will add more colors

const ElementArray = [Void, Rock, Test, Sand];

export function logic(grid, dimension) {
  for (let i = dimension - 1; i >= 0; i--) {
    for (let j = dimension - 1; j >= 0; j--) {
      let current = grid[j][i];

      /*
      grid[0][0] is top left
      grid[0][n] is top right
      grid[n][0] is bottom left
      */

      if (current.element === 'Void') {
        //do nothing
      } else if (current.element === 'Rock') {
        //also do probably nothing
      }
      if (current.element === 'Sand' && j < dimension - 1) {
        //just have to check if it needs to fall
        if (grid[j + 1][i].element === 'Void') {
          //fall down
          grid[j + 1][i].element = 'Sand';
          grid[j + 1][i].should_update = true;
          current.element = 'Void';
          current.should_update = true;
        }
      }
    }
  }

  return grid; ////////////////////
}
