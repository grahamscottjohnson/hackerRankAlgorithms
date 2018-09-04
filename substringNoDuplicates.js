//https://www.algoexpert.io/questions/Longest%20Substring%20Without%20Duplication

function longestSubstringWithoutDuplication(string) {
  const substring = new Substring(string);
  const results = [];
  string.split('').forEach(letter => {
    //detect a duplication by using a cache
    if (substring.has(letter)) {
      results.push([substring.start, substring.end]);
      const firstIndex = substring.get(letter).index;
      substring.removeStart(firstIndex);
    }
    substring.increaseEnd();
  });
  const finalResult = [substring.start, substring.end];
  results.push(finalResult);
  const bestResult = findBestResult(results);
  return bestResult;
}

function findBestResult() {}

class Substring {
  constructor(string, start = 0, end = 0) {
    this.string = string;
    this.start = start;
    this.end = end;
    this.letters = {};
  }
  get value() {
    return this.string.slice(this.start, this.end);
  }
  increaseEnd() {
    if (this.end !== this.string.length) {
      const letter = this.string[this.end];
      this.letters[letter] = { letter, index: this.end };
      this.end += 1;
    }
  }
  has(letter) {
    return !!this.letters[letter];
  }
  get(letter) {
    return this.letters[letter];
  }
  removeStart(index) {
    for (let i = this.start; i <= index; i += 1) {
      const letter = this.string[i];
      delete this.letters[letter];
    }
    this.start = index + 1;
  }
}

// Do not edit the line below.
exports.longestSubstringWithoutDuplication = longestSubstringWithoutDuplication;
exports.Substring = Substring;
