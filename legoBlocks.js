//https://www.hackerrank.com/challenges/lego-blocks/problem

'use strict';

const MAX_BLOCK_SIZE = 4;

const legoBlocksCache = new Map([[0, 0], [1, 1]]);

function legoBlocks(height, width) {
  if (height === 0 || width === 0) return 0;
  const allTowers = calculateAllTowers(height, width);
  const badTowers = calculateBadTowers(height, width);
  return allTowers - badTowers;
}

function calculateAllTowers(height, width) {
  const waysInARow = divideRowOfSize(width);
  const allTowers = Math.pow(waysInARow, height);
  return allTowers;
}

const rowWaysCache = new Map([[0, 1]]);

function calculateBadTowers(height, width) {
  if (width === 1) return 0;
  let badTowers = 0;
  for (
    let indexOfVerticalSplit = 1;
    indexOfVerticalSplit < width;
    indexOfVerticalSplit++
  ) {
    const towersLeftOfSplit = legoBlocks(height, indexOfVerticalSplit);
    const towersRightOfSplit = calculateAllTowers(
      height,
      width - indexOfVerticalSplit
    );
    badTowers += towersLeftOfSplit * towersRightOfSplit;
  }
  return badTowers;
}

function divideRowOfSize(width) {
  if (width < 0) return 0;
  if (!rowWaysCache.has(width)) {
    let ways = 0;
    for (let blockSize = 1; blockSize <= MAX_BLOCK_SIZE; blockSize++) {
      ways += divideRowOfSize(width - blockSize);
    }
    rowWaysCache.set(width, ways);
  }
  return rowWaysCache.get(width);
}

function choose(n, r) {
  return factorial(n) / factorial(r) / factorial(n - r);
}

const factorials = new Map([[0, 1], [1, 1]]);

function factorial(n) {
  if (!factorials.has(n)) {
    factorials.set(n, n * factorial(n - 1));
  }
  return factorials.get(n);
}

module.exports = {
  legoBlocks,
  divideRowOfSize,
  calculateBadTowers,
  calculateAllTowers,
};
