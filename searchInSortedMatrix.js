function searchInSortedMatrix(
  matrix,
  target,
  minPoint = [0, 0],
  maxPoint = [matrix.length - 1, matrix[0].length - 1]
) {
  //row is up and down
  // if (isSmall(matrix)) return naiveSearch(matrix, target);
  while (!isSmall(minPoint, maxPoint)) {
    const [midRow, midCol] = midPoint(minPoint, maxPoint);
    const value = matrix[midRow][midCol];
    if (value === target) {
      return [midRow, midCol];
    } else if (target < value) {
      maxPoint = [midRow, midCol];
    } else {
      const bottomLeft = searchInSortedMatrix(
        matrix,
        target,
        [midRow + 1, minPoint[1]],
        [maxPoint[0], midCol]
      );
      if (bottomLeft[0] !== -1) return bottomLeft;
      const topRight = searchInSortedMatrix(
        matrix,
        target,
        [minPoint[0], midCol + 1],
        [midRow, maxPoint[1]]
      );
      if (topRight[0] !== -1) return topRight;
      minPoint = [midRow + 1, midCol + 1];
    }
  }
  return naiveSearch(matrix, target, minPoint, maxPoint);
}

function isSmall(minPoint, maxPoint) {
  const [minRow, minCol] = minPoint;
  const [maxRow, maxCol] = maxPoint;
  return maxRow - minRow < 2 && maxCol - minCol < 2;
}

function midPoint(point1, point2) {
  return [average(point1[0], point2[0]), average(point1[1], point2[1])];
}

function average(start, end) {
  return Math.ceil((end + start) / 2);
}

function naiveSearch(matrix, target, minPoint, maxPoint) {
  const [minRow, minCol] = minPoint;
  const [maxRow, maxCol] = maxPoint;
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

// Do not edit the line below.
exports.searchInSortedMatrix = searchInSortedMatrix;
