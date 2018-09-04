//https://www.algoexpert.io/questions/Longest%20Substring%20Without%20Duplication

function longestSubstringWithoutDuplication(string) {
  const substring = new Substring(string);
  let bestResult = [0, 0]; //not storing actual string because copying strings is time consuming
  string.split('').forEach(letter => {
    const result = substring.getResult(letter);
    bestResult = takeMax(result, bestResult);
    substring.trimIfDuplicate(letter);
    substring.increaseEnd();
  });
  const [start, end] = bestResult;
  return string.slice(start, end);
}

function takeMax([start1, end1], [start2, end2]) {
  return end1 - start1 > end2 - start2 ? [start1, end1] : [start2, end2];
}

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
  trimIfDuplicate(letter) {
    if (this.has(letter)) {
      const firstIndex = this.get(letter).index;
      this.removeStart(firstIndex);
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
  getResult(letter) {
    const end = this.has(letter) ? this.end : this.end + 1;
    return [this.start, end];
  }
  increaseEnd() {
    if (this.end !== this.string.length) {
      const letter = this.string[this.end];
      this.letters[letter] = { letter, index: this.end };
      this.end += 1;
    }
  }
}

// Do not edit the line below.
exports.longestSubstringWithoutDuplication = longestSubstringWithoutDuplication;
exports.Substring = Substring;
