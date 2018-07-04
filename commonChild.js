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
    // hash both strings // why though? why not as you're doing it

    //start at end 
    //get all common children
    //store into hash
    //recurse on that output by adding one more letter

}
//slice will take a longer than using pointers, but I hate that.
// function commonChildren( hash, first, second ){
//     if (hash[`${first.value}_${second.value}`] != undefined){
//         return hash[`${first.value}_${second.value}`];
//     } else if ( first.length === second.length && first.length === 1 ){
//         return first.value === second.value ? first.value : '' ; 
//     } else if ( first.length > 1 ){
//         const newHash = commonChildren( hash, {value: first.value, length: first.length - 1} , second );
//         hash[`${first.value}_${second.value}`] = '' //fuuuuu
//     }
// }
function commonChildren( hash, first, second ){
    //bad: hash should store arrays of all common children, not just the max
    if (hash[`${first}_${second}`] != undefined){
        return hash[`${first}_${second}`];
    } else if ( first.length === second.length && first.length === 1 ){
        return first === second ? first : '' ; 
    } else if ( first.length > 1 ){
        const newHash = commonChildren( hash, first.slice(1), second );
        const letterToInspect = first.charAt(0);
        //find first occurence of letterToInspect in second and 
            //add that to all common children in hash[first_'-----(letterToInspect)...]
        hash[`${first}_${second}`] = 'fuuuuu';
    }
}
function hashString(){

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
