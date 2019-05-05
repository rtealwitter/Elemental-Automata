// This function became too long so it gets it's own file
function change(row, col, grid, size, dimension, element, mouseDown) {
  const newGrid = Array.from(grid);
  if (mouseDown) {
    if (size > 1) {
      // will act the same for size 2 and size 3 to reduce redundencies
      if (row > 0) {
        // will do up always
        if (col < dimension - 1) {
          newGrid[row - 1][col + 1] = Object.assign(grid[row - 1][col + 1], {
            // up and right
            element: element
          });
          newGrid[row][col + 1] = Object.assign(grid[row][col + 1], {
            // right
            element: element
          });
        }
        newGrid[row - 1][col] = Object.assign(grid[row - 1][col], {
          // up
          element: element
        });
      } else {
        if (col < dimension - 1) {
          // else just right
          newGrid[row][col + 1] = Object.assign(grid[row][col + 1], {
            // right
            element: element
          });
        }
      }
    }
    if (size > 2) {
      // does not handle up and right to reduce redundencies
      if (row < dimension - 1) {
        // will do down always
        if (col < dimension - 1) {
          newGrid[row + 1][col + 1] = Object.assign(grid[row + 1][col + 1], {
            // down and right
            element: element
          });
        }
        if (col > 0) {
          // will do left and left down always
          newGrid[row + 1][col - 1] = Object.assign(grid[row + 1][col - 1], {
            // left down
            element: element
          });
          newGrid[row][col - 1] = Object.assign(grid[row][col - 1], {
            // left
            element: element
          });
          if (row > 0) {
            newGrid[row - 1][col - 1] = Object.assign(grid[row - 1][col - 1], {
              // left up
              element: element
            });
          }
        }
        newGrid[row + 1][col] = Object.assign(grid[row + 1][col], {
          // down
          element: element
        });
      }
      if (row === dimension - 1 && col > 0) {
        // does left and left up (opposite of dimension 2)
        newGrid[row - 1][col - 1] = Object.assign(grid[row - 1][col - 1], {
          element: element
        });
        newGrid[row][col - 1] = Object.assign(grid[row][col - 1], {
          element: element
        });
      }
    }
    if (size > 3) {
      if (row > 1) {
        // does 2 above
        newGrid[row - 2][col] = Object.assign(grid[row - 2][col], {
          element: element
        });
        if (col < dimension - 1) {
          newGrid[row - 2][col + 1] = Object.assign(grid[row - 2][col + 1], {
            element: element
          });
        }
        if (col < dimension - 2) {
          // uppper right corner
          newGrid[row - 2][col + 2] = Object.assign(grid[row - 2][col + 2], {
            element: element
          });
        }
        if (col > 0) {
          // left corner
          newGrid[row - 2][col - 1] = Object.assign(grid[row - 2][col - 1], {
            element: element
          });
        }
      }
      if (row > 0 && col < dimension - 2) {
        newGrid[row - 1][col + 2] = Object.assign(grid[row - 1][col + 2], {
          element: element
        });
      }
      if (col < dimension - 2) {
        // right
        newGrid[row][col + 2] = Object.assign(grid[row][col + 2], {
          element: element
        });
      }
      if (row < dimension - 1 && col < dimension - 2) {
        // bottom right corner
        newGrid[row + 1][col + 2] = Object.assign(grid[row + 1][col + 2], {
          element: element
        });
      }
    }
    newGrid[row][col] = Object.assign(grid[row][col], {
      // always do clicked cell
      element: element
    });
  }
  return newGrid;
}
export default change;
