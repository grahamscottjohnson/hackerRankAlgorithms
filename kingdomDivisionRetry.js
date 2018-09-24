//https://www.hackerrank.com/challenges/kingdom-division/problem

'use strict';

function kingdomDivision(n, roads) {}

/*************
 * I/O
 *************/
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

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  let roads = Array(n - 1);

  for (let i = 0; i < n - 1; i++) {
    roads[i] = readLine()
      .split(' ')
      .map(roadsTemp => parseInt(roadsTemp, 10));
  }

  let result = kingdomDivision(n, roads);

  ws.write(result + '\n');

  ws.end();
}
