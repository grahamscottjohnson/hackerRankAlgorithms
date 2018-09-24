function searchInSortedMatrix(
  matrix,
  target,
  min = 0,
  max = Math.max(matrix.length, matrix[0].length) - 1
) {
  //this is all crap. min/max by diagonal does not work since L shape exists for both
  //log(n + m) might be possible if you deal with L shape for both > and <
  //otherwise can get (n + m) with Clement's solution
  if (!matrix[0].length) return [-1, -1];
  while (max - min > 1) {
    const mid = averageRoundedUp(min, max);
    const [r, c] = getBoundedIndex(matrix, mid);
    const value = matrix[r][c];
    if (value === target) {
      return [r, c];
    } else if (target < value) {
      max = mid;
    } else {
      min = mid;
    }
  }
  console.log(min, max);
  const searches = [
    [min, binarySearchRow(matrix, target, min)],
    [max, binarySearchRow(matrix, target, max)],
    [binarySearchColumn(matrix, target, max), max],
    [binarySearchColumn(matrix, target, min), min],
  ];
  let match = [-1, -1];
  searches.forEach(search => {
    if (wasSuccessful(search)) {
      match = search;
    }
  });
  return match;
}

function getBoundedIndex(matrix, i) {
  return [Math.min(i, matrix.length - 1), Math.min(i, matrix[0].length - 1)];
}

function binarySearchRow(matrix, target, row) {
  if (!matrix[row]) return -1;
  const getValue = (array, i) => array[i];
  return binarySearch(matrix[row], target, getValue);
}

function binarySearchColumn(matrix, target, col) {
  if (!matrix[0][col]) return -1;
  const getValue = (data, i) => data[i][col];
  return binarySearch(matrix, target, getValue);
}

function binarySearch(data, target, getValue) {
  let start = 0;
  let end = data.length - 1;
  while (start < end - 1) {
    const current = averageRoundedUp(start, end);
    const value = getValue(data, current);
    if (value === target) {
      return current;
    } else if (target < value) {
      end = current;
    } else {
      start = current;
    }
  }
  if (getValue(data, start) === target) return start;
  if (getValue(data, end) === target) return end;
  return -1;
}

function wasSuccessful(search) {
  return search[0] !== -1 && search[1] !== -1;
}

function isSmall(minPoint, maxPoint) {
  const [minRow, minCol] = minPoint;
  const [maxRow, maxCol] = maxPoint;
  return maxRow - minRow < 2 && maxCol - minCol < 2;
}

function midPoint(point1, point2) {
  return [average(point1[0], point2[0]), average(point1[1], point2[1])];
}

function averageRoundedUp(start, end) {
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
