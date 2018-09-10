function maxSubsetSumNoAdjacent(array) {
  if (!array.length) return 0;
  let prevSums = [array[0]];
  let lastNumberUsed = true;
  for (let i = 1; i < array.length; i += 1) {
    if (!lastNumberUsed) {
      prevSums[i] = prevSums[i - 1] + array[i];
      lastNumberUsed = true;
    } else {
      const sumWithThisInstead = (prevSums[i - 2] || 0) + array[i];
      if (sumWithThisInstead > prevSums[i - 1]) {
        prevSums.push(sumWithThisInstead);
        lastNumberUsed = true;
      } else {
        prevSums.push(prevSums[i - 1]);
        lastNumberUsed = false;
      }
    }
  }
  return prevSums[array.length - 1];
}

// Do not edit the line below.
exports.maxSubsetSumNoAdjacent = maxSubsetSumNoAdjacent;
