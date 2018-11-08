//https://www.algoexpert.io/questions/Longest%20Common%20Subsequence

function longestCommonSubsequence(str1, str2) {
  const matrix = new Matrix(str1.length + 1, str2.length + 1, '');

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
        const prevLCS = matrix.get(i - 1, j - 1);
        const currentLCS = prevLCS + str1.charAt(i - 1);
        matrix.set(i, j, currentLCS);
      } else {
        const prev1 = matrix.get(i - 1, j);
        const prev2 = matrix.get(i, j - 1);
        const prev = prev1.length > prev2.length ? prev1 : prev2;
        matrix.set(i, j, prev);
      }
    }
  }
  return matrix.get(str1.length, str2.length).split('');
}

class Matrix {
  constructor(numRows, numColumns, defaultValue) {
    this.storage = this.constructDefaultStorage(
      numRows,
      numColumns,
      defaultValue
    );
  }

  constructDefaultStorage(numRows, numColumns, defaultValue) {
    const storage = [];
    for (let i = 0; i < numRows; i++) {
      storage[i] = [];
      for (let j = 0; j < numColumns; j++) {
        storage[i][j] = defaultValue;
      }
    }
    return storage;
  }

  get(row, col) {
    return this.storage[row][col];
  }

  set(row, col, value) {
    this.storage[row][col] = value;
  }
}

// Do not edit the line below.
exports.longestCommonSubsequence = longestCommonSubsequence;
