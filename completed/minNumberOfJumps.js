function minNumberOfJumps(jumpOptions) {
  //initialize current index with the min numbers to get there
  //update every space along the path with a possible jump from this position
  //move to the next index and repeat the process
  //stop if you hit the last index
  const minJumps = [0];
  minJumps.targetIndex = jumpOptions.length - 1;
  return minNumberOfJumpsRecursion(jumpOptions, minJumps);
}
function minNumberOfJumpsRecursion(jumpOptions, minJumps) {
  jumpOptions.some((jump, position) => {
    updateWithThisJump(jumpOptions, position, minJumps);
    return hasFoundNumberOfJumps(minJumps);
  });
  return minJumps[minJumps.targetIndex];
}

function hasFoundNumberOfJumps(minJumps) {
  return minJumps[minJumps.targetIndex] !== undefined;
}

function updateWithThisJump(jumpOptions, startingPosition, minJumps) {
  const jumpLength = minJumps[startingPosition] + 1;
  const furthestPosition = startingPosition + jumpOptions[startingPosition];
  for (let i = startingPosition + 1; i <= furthestPosition; i += 1) {
    minJumps[i] = Math.min(jumpLength, minJumps[i] || jumpLength);
  }
  console.log(minJumps);
  return minJumps;
}

// Do not edit the line below.
// exports.minNumberOfJumps = minNumberOfJumps;
module.exports = {
  hasFoundNumberOfJumps,
  minNumberOfJumps,
  updateWithThisJump,
};
