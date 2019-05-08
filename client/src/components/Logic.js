function logic(grid, dimension) {
  const newGrid = JSON.parse(JSON.stringify(grid));

  function elementAt(i, j) {
    // Returns element at i,j
    if (i >= 0 && i < dimension && j >= 0 && j < dimension) {
      return grid[j][i].element;
    }
    return false;
  }

  function trade(i, j, newCurrent) {
    // Trades elements
    const newElement = newCurrent.element;
    Object.assign(newCurrent, {
      element: grid[j][i].element
    });
    Object.assign(newGrid[j][i], { element: newElement });
  }

  function isEmpty(i, j, current) {
    // Checks whether a cell is empty
    // or current element should fall into it
    const element = elementAt(i, j);
    if (element) {
      return (
        grid[j][i].element === 'Void' ||
        (current.element === 'Sand' && grid[j][i].element === 'Water') ||
        (current.element === 'Plant' && grid[j][i].element === 'Water')
      );
    }
    return element;
  }

  function searchFor(search, direction, i, j, newCurrent) {
    // Looks for lower elevation at i, j
    const element = elementAt(i + search, j + 1);
    if (element === 'Void') {
      trade(i + search, j + 1, newCurrent);
      search = false;
    } else if (element === 'Water') {
      search += direction;
    } else {
      search = false;
    }
    return search;
  }

  function flattenWater(i, j, current, newCurrent) {
    // Flattens water
    const direction = Math.random() >= 0.5 ? -1 : 1;
    let search1 = direction * -1;
    let search2 = direction;
    while (search1 || search2) {
      if (search1) {
        search1 = searchFor(search1, direction * -1, i, j, newCurrent);
      }
      if (search2) {
        search2 = searchFor(search2, direction, i, j, newCurrent);
      }
    }
  }

  function isFalling(i, j) {
    // Check whether current element is falling
    let newJ = j + 1;
    let newElement = elementAt(i, newJ);
    // TO-DO: ADD OTHER FALLING ELEMENTS LIKE OIL
    // TO BELOW CHECK
    while (newElement === 'Water' || newElement === 'Sand') {
      newJ += 1;
      newElement = elementAt(i, newJ);
    }
    if (!newElement) {
      return false;
    }
    return newElement === 'Void';
  }

  function pile(i, j, current, newCurrent) {
    // Creates pile of element
    if (isEmpty(i, j + 1, current)) {
      trade(i, j + 1, newCurrent);
    } else if (isFalling(i, j)) {
      console.log('falling');
    } else if (
      isEmpty(i - 1, j + 1, current) &&
      isEmpty(i + 1, j + 1, current)
    ) {
      Math.random() >= 0.5
        ? trade(i - 1, j + 1, newCurrent)
        : trade(i + 1, j + 1, newCurrent);
    } else if (isEmpty(i - 1, j + 1, current)) {
      trade(i - 1, j + 1, newCurrent);
    } else if (isEmpty(i + 1, j + 1, current)) {
      trade(i + 1, j + 1, newCurrent);
    } else if (current.element === 'Water') {
      flattenWater(i, j, current, newCurrent);
    }
  }

  function checkNeighbors(i, j, current, element) {
    // Check whether all four neighbors are element
    if (
      elementAt(i + 1, j) === element ||
      elementAt(i - 1, j) === element ||
      elementAt(i, j + 1) === element ||
      elementAt(i, j - 1) === element
    ) {
      return true;
    }
    return false;
  }

  function fire(i, j, current, newCurrent) {
    // if water is touching, fire disappears
    if (checkNeighbors(i, j, current, 'Water')) {
      trade(i, j, Object.assign(newCurrent, { element: 'Void' }));
    }
    //    Object.assign(newCurrent, { shouldUpdate: false });
    // disappears after set time if no element conducive to fire (wood, oil) is neighboring
    setTimeout(() => {
      trade(i, j, Object.assign(newCurrent, { element: 'Void' }));
    }, 200); // tried to have it last longer but this # is limited by the update speed
    const maxJumpI = dimension - j; // this doesn't make sense
    const maxJumpJ = dimension - i;
    const jumpI = Math.floor(Math.random() * maxJumpI);
    const jumpJ = Math.floor(Math.random() * maxJumpJ);
    if (elementAt(i, j - jumpJ) === 'Void') {
      Math.random() >= 0.5
        ? trade(i, j - Math.floor(jumpJ / 2), newCurrent)
        : trade(i, j - Math.floor(jumpJ / 4), newCurrent);
    }
    if (
      elementAt(i - jumpI, j) === 'Void' &&
      elementAt(i + jumpI, j) === 'Void'
    ) {
      Math.random() >= 0.5
        ? trade(i - Math.floor(jumpI / 4), j, newCurrent)
        : trade(i + Math.floor(jumpI / 4), j, newCurrent);
    }
  }

  function drinkWater(i, j, newCurrent) {
    if (elementAt(i + 1, j) === 'Water') {
      trade(i + 1, j, Object.assign(newCurrent, { element: 'Void' }));
      return true;
    } else if (elementAt(i - 1, j) === 'Water') {
      trade(i - 1, j, Object.assign(newCurrent, { element: 'Void' }));
      return true;
    } else {
      return false;
    }
  }

  function shouldGrow(i, j, current) {
    //looks to see if water is touching the Plant
    //only runs for top block of plant
    let currentJ = j;
    while (
      elementAt(i, currentJ) === 'Plant' ||
      elementAt(i, currentJ) === 'Flower'
    ) {
      if (drinkWater(i, currentJ, current, 'Water')) {
        return true;
      } else {
        if (j < dimension - 1) {
          currentJ += 1;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  function sprout(i, j, newCurrent) {
    trade(i, j, Object.assign(newCurrent, { element: 'Flower' }));
  }

  // function sproutLeaf(i, j, newCurrent) {
  //   Math.random() >= 0.5
  //     ? trade(i - 1, j, Object.assign(newCurrent, { element: 'Plant' }))
  //     : trade(i + 1, j, Object.assign(newCurrent, { element: 'Plant' }));
  // }

  function plant(i, j, current, newCurrent) {
    //should fall if void is below
    if (isEmpty(i, j + 1, current)) {
      trade(i, j + 1, newCurrent);
    }
    //should have a flower at the top
    else if (
      current.element === 'Plant' &&
      grid[j - 1][i].element === 'Void' &&
      j > 0
    ) {
      sprout(i, j - 1, current, newCurrent);
    }
    //should  grow one block per turn if water is touching the plant and there is room to grow, and drink water
    else if (
      current.element === 'Flower' &&
      shouldGrow(i, j + 1, current) &&
      grid[j - 1][i].element === 'Void' &&
      j > 1
    ) {
      trade(i, j - 1, Object.assign(newCurrent, { element: 'Flower' }));
      Object.assign(newCurrent, { element: 'Plant' });

      //should have chance to grow leaf
    }
  }

  for (let i = dimension - 1; i >= 0; i--) {
    for (let j = dimension - 1; j >= 0; j--) {
      const current = grid[j][i];
      const newCurrent = newGrid[j][i];

      /*
      grid[0][0] is top left
      grid[0][dimension - 1] is top right
      grid[dimension - 1][0] is bottom left
      grid[dimension - 1][dimension - 1] is bottom right
      */

      // do nothing for void
      // do nothing for rock
      if (current.element === 'Sand' || current.element === 'Water') {
        pile(i, j, current, newCurrent);
      } else if (current.element === 'Fire') {
        fire(i, j, current, newCurrent);
      } else if (current.element === 'Plant' || current.element === 'Flower') {
        plant(i, j, current, newCurrent);
      }
    }
  }

  return newGrid;
}

export default logic;
