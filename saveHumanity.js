//https://www.hackerrank.com/challenges/save-humanity/problem

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the virusIndices function below.
 */
function virusIndices(patientDNA, virusDNA) {
  //
  // ttttttttt
  // asdkfaosdijfoiasjdfoijasdofij abababababababab
  // banana nan
  // {difference: 0} => {mathces} => {matches}
  // abcdefgjoidajfo abcdefg
}

function main() {
  const t = parseInt(readLine(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const pv = readLine().split(' ');

    const p = pv[0];

    const v = pv[1];

    virusIndices(p, v);
  }
}

exports.virusIndices = virusIndices;
