//https://www.algoexpert.io/questions/Smallest%20Difference

function smallestDifference(arrayOne, arrayTwo) {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);
  let i = 0;
  let j = 0;
  let smallestDifferenceNumbers = [];
  let smallestKnownDifference = Infinity;
  while (i < arrayOne.length && j < arrayTwo.length) {
    const currentSmallestDifference = Math.abs(arrayOne[i] - arrayTwo[j]);
    if (currentSmallestDifference < smallestKnownDifference) {
      smallestDifferenceNumbers[0] = arrayOne[i];
      smallestDifferenceNumbers[1] = arrayTwo[j];
      smallestKnownDifference = currentSmallestDifference;
    }
    if (arrayOne[i] > arrayTwo[j]) {
      j++;
    } else if (arrayOne[i] < arrayTwo[j]) {
      i++;
    } else {
      break;
    }
  }
  return smallestDifferenceNumbers;
}

// Do not edit the line below.
exports.smallestDifference = smallestDifference;
