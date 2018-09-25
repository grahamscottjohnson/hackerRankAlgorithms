//https://www.algoexpert.io/questions/Disk%20Stacking

class Disk {
  constructor(array) {
    this.dimensions = array;
  }

  get sumOfDimensions() {
    return this.dimensions.reduce((acc, cur) => acc + cur, 0);
  }

  get magnitude() {
    const sumOfSquares = this.dimensions.reduce((acc, cur) => {
      return acc + cur * cur;
    }, 0);
    return Math.sqrt(sumOfSquares);
  }

  get distanceFromIdentity() {
    const dotProduct = this.sumOfDimensions;
    const magnitude = this.magnitude;
    const unitVectorMagnitude = Math.sqrt(3);
    const angle = Math.acos(dotProduct / (magnitude * unitVectorMagnitude));
    return magnitude * Math.sin(angle);
  }

  get maxRange() {
    return this.sumOfDimensions / Math.sqrt(3) + this.distanceFromIdentity;
  }

  get minRange() {
    return this.sumOfDimensions / Math.sqrt(3) - this.distanceFromIdentity;
  }
}

function diskStacking(disks) {
  //assign a value based on sum of dimensions
  //sort based on this value (handle collisions based on projection)
  const sortedDisks = disks.map(disk => new Disk(disk)).sort(sortDiskBySum);
  //traverse the data with a use / don't use aggregation
  //if max bound is greater than next max bound, don't use this, use next. otherwise use this either temporarily or pemerantently depending on next's lower bound
  const result = [];
  let prev = sortedDisks[0];
  for (let i = 1; i < sortedDisks.length; i++) {
    const current = sortedDisks[i];
    console.log(current.maxRange, prev.maxRange);
    if (current.maxRange < prev.maxRange) {
      prev = current;
    } else if (prev.maxRange < current.minRange) {
      result.push(prev);
      prev = current;
    }
  }
  result.push(prev);
  return result.map(disk => disk.dimensions);

  function sortDiskBySum(disk1, disk2) {
    return disk1.sumOfDimensions - disk2.sumOfDimensions;
  }
}

// Do not edit the line below.
exports.diskStacking = diskStacking;
exports.Disk = Disk;
