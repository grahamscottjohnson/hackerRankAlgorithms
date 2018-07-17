//https://www.hackerrank.com/challenges/an-interesting-game-1/problem

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });

// fs.readFile('./testInput.txt', 'utf8', (err, content) => {
fs.readFile('./gamingArrayinput16.txt', 'utf8', (err, content) => {
    if (err) throw err;
    inputString = content;

    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
})

// process.stdin.on('end', _ => {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));

//     main();
// });

function readLine() {
    return inputString[currentLine++];
}

function findNumMoves(arr, currentPeak) {
    //base case of empty array
    if (currentPeak === arr.length || arr.length === 0){
        return 0;
    }
    //iterate across the array and find max ranges
    currentPeak = currentPeak || 0;
    //when you find a value that's greater than the first value, 
    //you found the last move the player will make
    let nextPeak = findIndexOfNextPeak(arr, currentPeak);
    //so count up the moves and recursively look at the rest of the array
    const moves = 1 + findNumMoves(arr, nextPeak);
    console.log(`for currentPeak: ${currentPeak}, got nextPeak: ${nextPeak}, and moves: ${moves}`)
    return moves;
}

function findNumMovesNoRec(arr, currentPeak) {
    let moves = 0;
    if (currentPeak === arr.length || arr.length === 0){
        return 0;
    }
    currentPeak = currentPeak || 0;
    while (currentPeak !== arr.length){
        currentPeak = findIndexOfNextPeak(arr, currentPeak);
        moves += 1;
    }
    return moves;
}

function findIndexOfNextPeak(arr, currentPeak){
    if (currentPeak >= arr.length){
        throw new Error('bad currentPeak in findIndexOfNextPeak')
    }
    const peak = arr[currentPeak];
    let nextPeak = currentPeak + 1;
    while (arr[nextPeak] < peak && nextPeak !== arr.length){ //values in arr are distinct
        nextPeak += 1;
    }
    return nextPeak;
}

function gamingArray(arr){
    return findNumMovesNoRec(arr, 0) % 2 === 0 ? 'ANDY' : 'BOB'
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const g = parseInt(readLine(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const arrCount = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = gamingArray(arr);

        console.log(`case: ${gItr}`, result);
        // ws.write(result + "\n");
    }
    // ws.end();
}

module.exports = {
    gamingArray,
    findIndexOfNextPeak,
    findNumMoves,
    findNumMovesNoRec,
}
