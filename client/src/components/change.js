// This function became too long so it gets it's own file
function change(row, col, grid, size, dimension, element) {
  const newGrid = Array.from(grid);

  const upperBound = dimension - 1;
  const lowerBound = 0;
  const range = [Math.ceil(size / 2) - 1, Math.floor(size / 2)];
  let i;
  let j;

  for (i = row - range[1]; i <= row + range[0]; i++) {
    if (i < lowerBound) {
      i = lowerBound;
    }
    if (i > upperBound) {
      break;
    }
    for (j = col - range[0]; j <= col + range[1]; j++) {
      if (j < lowerBound) {
        j = lowerBound;
      }
      if (j > upperBound) {
        break;
      }
      newGrid[i][j] = Object.assign(grid[i][j], {
        element: element
      });
    }
  }
  return newGrid;
}
export default change;
