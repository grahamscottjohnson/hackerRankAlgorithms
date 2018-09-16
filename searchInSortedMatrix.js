function searchInSortedMatrix(matrix, target) {
  //row is up and down
  // if (isSmall(matrix)) return naiveSearch(matrix, target);
  let minRow = 0;
  let minCol = 0;
  let maxRow = matrix.length - 1;
  let maxCol = matrix[0].length - 1;
  while (!isSmall()) {
    const midRow = midPoint(minRow, maxRow);
    const midCol = midPoint(minCol, maxCol);
    const value = matrix[midRow][midCol];
    if (value === target) {
      return [midRow, midCol];
    } else if (target < value) {
      maxRow = midRow;
      maxCol = midCol;
    } else {
      minRow = midRow;
      minCol = midCol;
    }
  }
  return naiveSearch();

  function isSmall() {
    return maxRow - minRow < 2 && maxCol - minCol < 2;
  }

  function naiveSearch() {
    // console.log(minRow, minCol, maxRow, maxCol);
    for (let i = minRow; i <= maxRow; i += 1) {
      for (let j = minCol; j <= maxCol; j += 1) {
        if (matrix[i][j] === target) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }
}

function midPoint(start, end) {
  return Math.ceil((end + start) / 2);
}

// Do not edit the line below.
exports.searchInSortedMatrix = searchInSortedMatrix;
