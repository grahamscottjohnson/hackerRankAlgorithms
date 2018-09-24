//https://www.algoexpert.io/questions/Underscorify%20Substring

function underscorifySubstring(string, substring) {
  let result = string;
  const ranges = makeMergedRangesOfSubstring(string, substring); //n^2
  let offsetForUnderscores = 0;
  ranges.forEach(range => {
    //potentially n
    range = range.map(position => position + offsetForUnderscores);
    result = insertUnderscoreIntoStringAt(result, range); //n time
    offsetForUnderscores += 2;
  });
  return result;
}

function makeMergedRangesOfSubstring(string, substring) {
  //n^2
  const ranges = makeRangesOfSubstring(string, substring); //n^2
  if (ranges.length === 0) {
    return ranges;
  }
  const mergedRanges = [];
  let currentStart = null;
  let currentEnd = null;
  ranges.forEach(([start, end]) => {
    //loop n times, do constant work
    if (currentStart === null) {
      currentStart = start;
      currentEnd = end;
    } else if (start > currentEnd) {
      mergedRanges.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    } else {
      currentEnd = end;
    }
  });
  mergedRanges.push([currentStart, currentEnd]);
  return mergedRanges;
}

function makeRangesOfSubstring(string, substring) {
  //n^2 time
  if (string === '' || substring === '') return [];
  //can be optimized by not slicing so much and maybe not indexOf
  const ranges = [];
  let start = string.indexOf(substring);
  let end;
  let slicedOffset = 0;
  while (start !== -1) {
    //potentially loop n times
    end = start + substring.length;
    ranges.push([start + slicedOffset, end + slicedOffset]);
    slicedOffset += start + 1;
    string = string.slice(start + 1); //do n work
    start = string.indexOf(substring);
  }
  return ranges;
}

function insertUnderscoreIntoStringAt(string, [start, end]) {
  // n time
  return `${string.slice(0, start)}_${string.slice(start, end)}_${string.slice(
    end
  )}`;
}

// Do not edit the line below.
exports.underscorifySubstring = underscorifySubstring;
exports.makeRangesOfSubstring = makeRangesOfSubstring;
exports.makeMergedRangesOfSubstring = makeMergedRangesOfSubstring;
exports.insertUnderscoreIntoStringAt = insertUnderscoreIntoStringAt;
