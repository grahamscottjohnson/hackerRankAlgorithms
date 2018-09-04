function numberOfBinaryTreeTopologies(n, cache = new Map()) {
  // there are n -1 other leaves besides the root
  // loop up to n-1 to distribute that many children to left and rest to right
  // call recursively on each case
  // add up combinations
  // use a base case of 0 => 0
  if (n === 0) {
    return 1;
  }
  if (cache.has(n)) {
    return cache.get(n);
  }
  let numberCombinations = 0;
  for (let i = 0; i < n; i += 1) {
    numberCombinations +=
      numberOfBinaryTreeTopologies(i) * numberOfBinaryTreeTopologies(n - 1 - i);
  }
  cache.set(n, numberCombinations);
  return numberCombinations;
}

// Do not edit the line below.
exports.numberOfBinaryTreeTopologies = numberOfBinaryTreeTopologies;
