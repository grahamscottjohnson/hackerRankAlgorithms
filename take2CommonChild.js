//https://www.hackerrank.com/challenges/common-child/problem

'use strict';

// const fs = require('fs');

// process.stdin.resume();
// process.stdin.setEncoding('utf-8');

// let inputString = '';
// let currentLine = 0;

// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });

// process.stdin.on('end', _ => {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));

//     main();
// });

// function readLine() {
//     return inputString[currentLine++];
// }

// 'ABCD'
// 'ABDC'

//common children: ABC, ABD, AB ... A B C D

// Complete the commonChild function below.
function commonChild(s1, s2) {
    const hash = {};
    const allChildren = getCommonChildren(hash, s1, s2);
    return allChildren.reduce( (accum, cur) => {
        return cur.value.length > accum ? cur.value.length : accum;
    }, 0);
}   
function getCommonChildren( hash, first, second ){ //first and second are indices counting from the end starting at 1
    if (hash[ getKey(first, second) ]){
        return hash[ getKey(first, second) ];
    } 
        //need basecase
        //
    else {
        const letter = getLetterOfFirst(first);
        const match = findLatestMatch(letter); //returns the 
    }
}

function getKey(first, second){
    return `${first}_${second}`;
}

function getAllIndicesOfLetter( inStr, letter ){
    //optimize by keeping track of this in a hash
    const result = [];
    for (let index = 0; index < inStr.length; index += 1){
        if (inStr.charAt(index) === letter){
            result.push( inStr.length - index );
        }
    }
    // console.log(`result of indices for ${letter} in ${inStr}:`, result)
    return result;
}


// function main() {
//     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

//     const s1 = readLine();

//     const s2 = readLine();

//     let result = commonChild(s1, s2);

//     ws.write(result + "\n");

//     ws.end();
// }

console.log(commonChild('ELGGYJWKTDHLXJRBJLRYEJWVSUFZKYHOIKBGTVUTTOCGMLEXWDSXEBKRZTQUVCJNGKKRMUUBACVOEQKBFFYBUQEMYNENKYYGUZSP', 'FRVIFOVJYQLVZMFBNRUTIYFBMFFFRZVBYINXLDDSVMPWSQGJZYTKMZIPEGMVOUQBKYEWEYVOLSHCMHPAZYTENRNONTJWDANAMFRX'))

// module.exports = {
//     getAllIndicesOfLetter,
//     getCommonChildren,
//     getKey,
//     commonChild
// }
// module.exports = commonChild