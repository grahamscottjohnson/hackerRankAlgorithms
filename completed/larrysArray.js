//https://www.hackerrank.com/challenges/larrys-array/problem

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

// Complete the larrysArray function below.
function larrysArray(A) {
    // let sortedArray = A.slice().sort( (a, b) => a - b );
    let sortedArray = fillTo( A.length );
    try{
        sortedArray.forEach( matchToSorted );
        return 'YES';
    }catch( err ){
        if ( err === 'NO MATCH' ){
            return 'NO';
        }
    }

    function matchToSorted( value, sortedIndex ){
        // no need for handleRepeats( value ); since we're guaranteed no repeats.
        let start = A.indexOf( value );
        getStartToEnd( A, start, sortedIndex);
    }
}
function getStartToEnd( array, start, end){
    //assumes every index before end is already sorted
    if ( start === end ){
        return true;
    }
    else if ( start < end ){
        throw 'I only coded to sort the minimum';
    }
    else if ( end < start - 1 ){
        if ( confirmSmallest( array.slice( start - 2, start + 1 ), 2 ) ){
            rightRotate( array, start - 2 );
            getStartToEnd( array, start - 2, end);
        }
        else{
            throw 'NO MATCH';
        }
    }
    else if ( confirmSmallest( array.slice( start - 1, start + 2 ), 1 ) ){
        leftRotate( array, start - 1 );
        return true;
    }
    else{
        throw 'NO MATCH';
    }
}

function confirmSmallest( array, index ){
    if ( array.length !== 3 ){
        throw 'NO MATCH';
    }
    return array.every( value => array[ index ] <= value );
}

function rightRotate( array, index ){
    let temp = array[ index + 2 ];
    array[ index + 2 ] = array[ index + 1 ];
    array[ index + 1 ] = array[ index ];
    array[ index ] = temp;
}

function leftRotate( array, index ){
    let temp = array[ index ];
    array[ index ] = array[ index + 1 ];
    array[ index + 1 ] = array[ index + 2 ];
    array[ index + 2 ] = temp;
}

function fillTo ( number ){
    let result = [];
    for ( let value = 1; value <= number; value += 1){
        result.push( value );
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const A = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));

        let result = larrysArray(A);

        ws.write(result + "\n");
    }

    ws.end();
}
