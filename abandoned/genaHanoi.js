// https://www.hackerrank.com/challenges/gena/problem

'use strict';

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



function main() {
    //const N = parseInt(readLine(), 10);

    const indexedHanoi = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    return greedyHanoi( indexedHanoi );
}

function greedyHanoi( indexedHanoi ){
    let count = 0;
    indexedHanoi.forEach( (position, disc) => {
        count += moveTo1( indexedHanoi, disc, position );
    });
    return count;
}

function moveTo1( indexedHanoi, disc, position ){
    //code
}

function smartSort( indexedHanoi ){
    
}