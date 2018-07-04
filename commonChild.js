//https://www.hackerrank.com/challenges/common-child/problem

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

// Complete the commonChild function below.
function commonChild(s1, s2) {
    //start with first letter of s1
        //if only one letter
    //find first occurence in s2 of first letter
        //if no letter, return/hash ''
    //slice off first letter of s1 and up to first letter of s2
        //return where the match occurs
        //recurse on those slices. store in hash for speed.
            //storing in hash means add that letter to every common child that came before
    //now do the same for second letter. inspect the whole of s2
    const hash = {};
    const allChildren = getCommonChildren(hash, s1, s2);
    return allChildren.reduce( (accum, cur) => {
        return cur.value.length > accum ? cur.value.length : accum;
    }, 0);
}   

// function getCommonChildren( hash, first, second ){
//     if ( hash[ getKey(first, second) != undefined ]) {
//         return;
//     }
//     if ( first.length <= 1 ){
//         const index = findIndexOfLastMatch( hash, first.charAt(0), second);
//         const newFirst = first.slice(1);
        
//         getCommonChildren( hash, first.slice(1), )
//     }
// }
// hash = {
//     first_second: [
//         {
//             value: stringInCommon,
//             indexOfFirst: whereCommonChildStartsInFirst,
//                  //where index is measure from the end char starting with 1
//             indexOfSecond: whereCommonChildStartsInSecond, 
//         }
//     ]
// }
function getCommonChildren( hash, first, second ){
    if ( hash[ getKey(first, second) ] != undefined ) {
        return hash[ getKey(first, second) ];
    }
    else if (first.length > 0 && second.length > 0) { //if first has length bigger than one
        const letter = first.charAt(0);
        // const previousHash = getCommonChildren( hash, first.slice(1), second );
        //     //needs to tell me where in second the common child started
        const indices = getAllIndicesOfLetter( second, letter );
        const newCommonChildren = []; 
        indices.forEach( (index) => {
            const commonChildren = getCommonChildren( hash, first.slice(1), second.slice(index + 1) );
            newCommonChildren.push( 
                ...commonChildren.map( common => {
                    //probably don't have to add to all children maybe?
                    return Object.assign({}, common, {indexOfFirst: first.length})
                })
            )
        })
        hash[ getKey(first, second) ] = newCommonChildren;
        return hash[ getKey(first, second) ];
    } else if (first === '' || second === '') {
        return [];
    } else {
        throw Error('inputs do not make sense: ' + first + ' and ' + second);
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
    return result;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}

module.exports = {
    hashString,
    commonChildren
}
