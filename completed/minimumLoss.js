//https://www.hackerrank.com/challenges/minimum-loss/problem

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

// Complete the minimumLoss function below.
function minimumLoss(price) {
    let informedPrice = price.map( (price, index) => {
        return {
            price,
            index
        }
    });
    let sortedPrices = informedPrice.sort( (a,b) => a.price - b.price );
    let minLoss = Infinity;
    sortedPrices.forEach( (price, index) => {
        if (index !== 0){            
            const prevPrice = sortedPrices[index-1];
            if (prevPrice.index > price.index){            
                minLoss = Math.min( minLoss, price.price - prevPrice.price );
            }
        }
    });
    return minLoss
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const price = readLine().split(' ').map(priceTemp => parseInt(priceTemp, 10));

    let result = minimumLoss(price);

    ws.write(result + "\n");

    ws.end();
}
