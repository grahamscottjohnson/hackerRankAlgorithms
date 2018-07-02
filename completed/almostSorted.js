//https://www.hackerrank.com/challenges/almost-sorted/problem

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

// Complete the almostSorted function below.
function almostSorted(arr) {
    let informedArray = arr.map( (value, index) => {
        return {
            value,
            index,
        }
    });
    let sortedArray = arr.slice().sort( (a,b) => a-b );
    let unsortedSegments = informedArray.filter( (obj, index) => {
        return obj.value !== sortedArray[index];
    })
    // console.log(`sorted and filtered`, sortedArray, unsortedSegments);
    if ( unsortedSegments.length === 0 ){
       console.log( `yes` );
    } else if ( unsortedSegments.length === 2 ){
        console.log(  `yes\nswap ${unsortedSegments[0].index + 1} ${unsortedSegments[1].index + 1}` )
    } else if ( isReversable( arr, unsortedSegments ) ){
        console.log(  `yes\nreverse ${unsortedSegments[0].index + 1} ${unsortedSegments[ unsortedSegments.length - 1 ].index + 1}` )
    } else {
       console.log(  `no` );
    }
}

function isReversable( originalArray, unsortedSegments ){
    let differenceIndex = unsortedSegments[0].index;
    let remainingUnsortedValues = unsortedSegments.slice().reverse();
    let isDescending;
    while( remainingUnsortedValues.length > 0 ){
        isDescending = originalArray[differenceIndex] >= originalArray[differenceIndex + 1]
        if ( !isDescending ){
            // console.log( remainingUnsortedValues.length, remainingUnsortedValues[0] );
            // console.log( isDescending, originalArray[differenceIndex], originalArray[differenceIndex + 1] )
            // console.log( `cannot reverse because array is not descending:`, differenceIndex, originalArray[differenceIndex - 1], originalArray[differenceIndex], originalArray[differenceIndex + 1] );
            return remainingUnsortedValues.length === 1; //i.e. this final element was the last one in the reverse, no other gaps
        } else {
            if (remainingUnsortedValues[ remainingUnsortedValues.length - 1 ].index === differenceIndex){
                remainingUnsortedValues.pop();
            }
            differenceIndex += 1;
        }
    }
    return true;
}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    almostSorted(arr);
}
