//https://www.hackerrank.com/challenges/sherlock-and-cost/problem

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

// Complete the cost function below.
function cost(B) {
    if (B.length === 1) return 0;
    //find the differences between next and current

    //each index has two decisions, equal the input or be 1
    //create dominant strategy sections
        //check dominance by looking at previous decision and see if changing would be better
    const cumulativeInfo = {
        0: {
            key: 0,
            value: B[0],
            cumulative: 0,
            cumulativeReverse: 0,
            output: 1,
        }
    }
    name( B, cumulativeInfo, 1);
}

function goLongOrShort(prev, next){
    const long = Math.abs(prev - next);
    const short =  Math.abs(prev - 1);
    const [output, difference] = long > short ? [next, long] : [1, short];
    return {
        output,
        difference,
    }
}

function name( inArray, cumulativeInfo, index ){
    const prevInfo = cumulativeInfo[index - 1];
    const reverseOutput = prevInfo.output === prevInfo.value ? 1 : prevInfo.value;
    const cumulative = prevInfo.cumulative + goLongOrShort(prevInfo.output, inArray[index]).difference;
    const cumulativeReverse = prevInfo.cumulativeReverse + goLongOrShort(reverseOutput, inArray[index]).difference;
    
    const newCumulativeInfo = {...cumulativeInfo, [index]: {
        key: index,
        value: inArray[inArray],
        // cumulative:
        // cumulativeReverse:
        // output:
    }}
    return newCumulativeInfo;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const B = readLine().split(' ').map(BTemp => parseInt(BTemp, 10));

        let result = cost(B);

        ws.write(result + "\n");
    }

    ws.end();
}
