//https://www.algoexpert.io/questions/Find%20Three%20Largest%20Numbers

function findThreeLargestNumbers(array) {
  //initalize top 3
  //traverse the array
  //if number > least of top 3, add to top 3
  //return top3
  const list = new MaxList(3);
  array.forEach(list.tryToAdd.bind(list));
  return list.list;
}

class MaxList {
  constructor(size) {
    this.size = size;
    this.list = new Array(size).fill(-Infinity);
  }
  compare(number) {
    //see if a number should go in the list by checking the min in the list
    return number > this.getMin();
  }
  getMin() {
    return this.list[0];
  }
  tryToAdd(number) {
    if (this.compare(number)) {
      this.list[0] = number;
      this.list.sort((a, b) => a - b);
    }
  }
}

// Do not edit the line below.
exports.findThreeLargestNumbers = findThreeLargestNumbers;
exports.MaxList = MaxList;
