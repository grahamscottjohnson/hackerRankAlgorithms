//https://www.hackerrank.com/challenges/breaking-sticks/problem

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
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the longestSequence function below.
function longestSequence(a) {
    // Return the length of the longest possible sequence of moves.
    return a.reduce( (accum, stick) => {
      return accum + findMoves( stick );
    }, 0 );
}
function findMoves( stick ){
  let primeFactors = findPrimeFactors( stick );
  return recMoves( stick, 1, primeFactors );
}
function recMoves( stick, numSticks, primeFactors ){
  if ( !primeFactors[0] ){
    return 1; //TODO
  }
  let newStickSize = stick / primeFactors[0].value;
  let newNumSticks = numSticks * primeFactors[0].value
  primeFactors.removePrimeFactor();
  return numSticks + recMoves( newStickSize, newNumSticks, primeFactors)
}
function removePrimeFactor(){
  this[0].power -= 1;
  if ( this[0].power === 0 ){
    this.shift();
  }
}
function findPrimeFactors( number ){
  let factors = [];
  let primes = globalPrimes.slice();
  while ( number !== 1 && primes.length > 0){
    if ( number % primes[0] === 0 ){
      if ( primes[0] !== factors[0] ){
        factors.unshift({
          value: primes[0],
          power: 0
        })
      }
      factors[0].power += 1;
      number = Math.round( number / primes[0] );
    }
    else {
      primes.shift();
    }
  }
}
// function createMaxHeap(){
//   return [];
// }
// createMaxHeap.prototype =
// createMaxHeap.prototype =
// createMaxHeap.prototype =
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = longestSequence(a);

    ws.write(result + "\n");

    ws.end();
}
