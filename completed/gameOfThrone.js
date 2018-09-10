//https://www.hackerrank.com/challenges/game-of-thrones/problem

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

// Complete the gameOfThrones function below.
function gameOfThrones(s) {
  const countOfLetters = new Map();
  for (let char of s) {
    const prevCount = countOfLetters.get(char) || 0;
    countOfLetters.set(char, prevCount + 1);
  }
  let alreadyHasOneOdd = false;
  for (let [key, count] of countOfLetters) {
    const isOdd = count % 2 === 1;
    if (isOdd) {
      if (alreadyHasOneOdd) return false;
      else alreadyHasOneOdd = true;
    }
  }
  return true;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  let result = gameOfThrones(s);

  ws.write(result + '\n');

  ws.end();
}

exports.gameOfThrones = gameOfThrones;
