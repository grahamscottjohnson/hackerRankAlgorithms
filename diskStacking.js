//https://www.algoexpert.io/questions/Disk%20Stacking

function diskStacking(disks) {
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
