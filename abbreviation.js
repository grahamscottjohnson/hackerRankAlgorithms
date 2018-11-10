//https://www.hackerrank.com/challenges/abbr/problem

'use strict';

function abbreviation(a, b) {
  //complexity O(a + b)
  let BIndex = 0;
  let AIndex = 0;
  let shouldDeleteAllLowercase = false;
  let canNotDeleteAllLowercase = false;
  while (AIndex < a.length) {
    if (differentLetters(a[AIndex], b[BIndex])) {
      if (isCapitalized(a[AIndex])) {
        if (
          a ===
          'BFZZVHdQYHQEMNEFFRFJTQmNWHFVXRXlGTFNBqWQmyOWYWSTDSTMJRYHjBNTEWADLgHVgGIRGKFQSeCXNFNaIFAXOiQORUDROaNoJPXWZXIAABZKSZYFTDDTRGZXVZZNWNRHMvSTGEQCYAJSFvbqivjuqvuzafvwwifnrlcxgbjmigkms'
        ) {
          console.log(a[AIndex], b[BIndex], AIndex, BIndex);
        }
        return 'NO';
      } else {
        shouldDeleteAllLowercase = true;
      }
    } else if (isCapitalized(b[BIndex])) {
      BIndex++;
    } else if (isCapitalized(a[AIndex])) {
      if (
        a ===
        'BFZZVHdQYHQEMNEFFRFJTQmNWHFVXRXlGTFNBqWQmyOWYWSTDSTMJRYHjBNTEWADLgHVgGIRGKFQSeCXNFNaIFAXOiQORUDROaNoJPXWZXIAABZKSZYFTDDTRGZXVZZNWNRHMvSTGEQCYAJSFvbqivjuqvuzafvwwifnrlcxgbjmigkms'
      ) {
        console.log('flag2');
      }
      return 'NO';
    } else {
      BIndex++;
      canNotDeleteAllLowercase = true;
    }
    AIndex++;
  }
  if (
    (shouldDeleteAllLowercase && canNotDeleteAllLowercase) ||
    BIndex < b.length
  ) {
    if (
      a ===
      'BFZZVHdQYHQEMNEFFRFJTQmNWHFVXRXlGTFNBqWQmyOWYWSTDSTMJRYHjBNTEWADLgHVgGIRGKFQSeCXNFNaIFAXOiQORUDROaNoJPXWZXIAABZKSZYFTDDTRGZXVZZNWNRHMvSTGEQCYAJSFvbqivjuqvuzafvwwifnrlcxgbjmigkms'
    ) {
      console.log('flag3');
    }
    return 'NO';
  }
  return 'YES';
}

function differentLetters(letterA = '$', letterB = '$') {
  return letterA.toUpperCase() !== letterB.toUpperCase();
}

function isCapitalized(letter) {
  return letter && letter.toUpperCase() === letter;
}

function blah(a, b) {
  const matrix = [[]];
  let BIndex = 0;
  let construct = [];
  let possibleLowerCase = [];
  for (let AIndex = 0; AIndex < a.length; AIndex++) {
    const ALetter = a[AIndex];
    if (isCapitalized(ALetter)) {
      construct.push(ALetter);
    } else {
      possibleLowerCase.push(ALetter);
    }
  }
}

function iterateB(a, b) {
  let leftCapitalIndex = 0;
  let rightCapitalIndex = 0;
  let rightCapitalLetter = '';
  let currentIndex = 0;
  while (currentIndex < b.length) {
    const currentLetter = b[currentIndex];
    if (isCapitalized(currentLetter)) {
      rightCapitalIndex = currentIndex;
      rightCapitalLetter = currentLetter;
      inspect(leftCapitalIndex, rightCapitalIndex);
    }
    currentIndex++;
  }
}

function testAbbreviate(a, b) {
  // let AIndex = 0
  // let BIndex = 0
  const canDeleteLowercases = !hasLowercase(b);
  const matches = [];
  for (let i = 0; i < a.length; i++) {
    const letter = a[i];
    if (isCapitalized(letter)) {
      //append letter, add to matches
    } else if (canDeleteLowercases) {
      //TODO
    } else {
      //has to match exactly or become capitalized
    }
  }
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

function abbreviation2(a, b) {
  const matrix = new Matrix(b.length, a.length, '');

  for (let bIndex = 0; bIndex < b.length; bIndex++) {
    for (let aIndex = 0; aIndex < a.length; aIndex++) {
      //
    }
  }
}

module.exports = {
  abbreviation,
};
