function searchInSortedMatrix(matrix, target) {
  //row is up and down
  if (!matrix.length || !matrix[0].length) return [-1, -1];
  let row = 0;
  let col = 0;
  if (matrix[row][col] === target) {
    return [row, col];
  }
  return [-1, -1];
}

// Do not edit the line below.
exports.searchInSortedMatrix = searchInSortedMatrix;
