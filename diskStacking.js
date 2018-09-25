//https://www.algoexpert.io/questions/Disk%20Stacking

class Disk {
  constructor(array) {
    this.dimensions = array;
  }

  get projectedUnitValue() {
    //111 dot dimensions
    const dotProduct = this.dotProductWithIdentity();
    // const magnitude = this.magnitude();
    // const angle = Math.acos(magnitude / dotProduct);
    return dotProduct;
  }

  dotProductWithIdentity() {
    return this.dimensions.reduce(sum);

    function sum(acc, cur) {
      return acc + cur;
    }
  }

  magnitude() {
    const sumOfSquares = this.dimensions.reduce((acc, cur) => {
      return acc + cur * cur;
    }, 0);
    return Math.sqrt(sumOfSquares);
  }
}

function diskStacking(disks) {
  //project onto y = x = z
  //sort based on this projection (handle collisions based on projection)
  //traverse the data with a use / don't use aggregation
  //return that
  const sortedDisks = disks.slice().sort((a, b) => a[0] - b[0]);
  return filterDuplicates(sortedDisks);
}

function filterDuplicates(array) {
  const items = new Set();
  array.map(squishDisk).forEach(element => items.add(element));
  return Array.from(items).map(unsquishDisk);
}

function squishDisk(disk) {
  return disk.join('_');
}

function unsquishDisk(string) {
  return string.split('_').map(str => +str);
}

// Do not edit the line below.
exports.diskStacking = diskStacking;
exports.Disk = Disk;
