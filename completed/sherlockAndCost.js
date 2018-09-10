//https://www.hackerrank.com/challenges/sherlock-and-cost/problem

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the cost function below.
function cost(array) {
  if (array.length < 2) return 0;
  let oneBack = [array[1] - 1, array[0] - 1];
  let twoBack = [0, 0]; //up best, down best
  for (let i = 2; i < array.length; i += 1) {
    const stayUp = oneBack[0] + Math.abs(array[i] - array[i - 1]);
    const downUp = twoBack[0] + array[i - 2] + array[i] - 2;
    const stayDown = oneBack[1];
    const upDown = twoBack[1] + (array[i - 1] - 1) * 2;
    const currentBest = [Math.max(stayUp, downUp), Math.max(stayDown, upDown)];
    twoBack = oneBack;
    oneBack = currentBest;
  }
  return Math.max(...oneBack);
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine(), 10);

    const B = readLine()
      .split(' ')
      .map(BTemp => parseInt(BTemp, 10));

    let result = cost(B);

    ws.write(result + '\n');
  }

  ws.end();
}

module.exports = {
  cost,
};
