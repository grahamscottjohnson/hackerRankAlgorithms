//https://www.algoexpert.io/questions/Longest%20Common%20Subsequence

//solution works, but is O(n^3). Can be done in O(n^2)

function longestCommonSubsequence(str1, str2, cache = new Map()) {
  // extract the first letter of str 1. find LCS for rest of str1 and str2
  // find a matching letter in str 2. find LCS for rest of str1 and rest of str2 from matched letter. add letter to the LCS
  // return the greater of the two.
  if (str1 === '' || str2 === '') return [];
  if (cache.has(str1 + '_' + str2)) {
    return cache.get(str1 + '_' + str2);
  }
  const matchedSubsequence = findMatchedSubsequence(str1, str2, cache);
  const subsequenceWithOutFirstLetter = longestCommonSubsequence(
    str1.slice(1),
    str2,
    cache
  );
  const result =
    subsequenceWithOutFirstLetter.length > matchedSubsequence.length
      ? subsequenceWithOutFirstLetter
      : matchedSubsequence;
  cache.set(str1 + '_' + str2, result);
  return result;
}
// findMatchedSubsequence
function findMatchedSubsequence(str1, str2, cache = new Map()) {
  const firstLetter = str1.charAt(0);
  const matchingIndex = str2.indexOf(firstLetter);
  if (matchingIndex === -1) {
    return [];
  }
  const restOfMatch = longestCommonSubsequence(
    str1.slice(1),
    str2.slice(matchingIndex + 1),
    cache
  );
  return [firstLetter, ...restOfMatch];
}

// Do not edit the line below.
exports.longestCommonSubsequence = longestCommonSubsequence;
exports.findMatchedSubsequence = findMatchedSubsequence;
