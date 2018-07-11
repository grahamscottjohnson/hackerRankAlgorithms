//https://www.hackerrank.com/challenges/lego-blocks/problem
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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function legoBlocks(n, m) {
//n height, m width
  return recLegoBlocks(n, m, {});
}
function recLegoBlocks(n, m, storage){
  if (storage[`LB${n}_${m}`]){
    return storage[`LB${n}_${m}`];
  }
  let horiz = countHorizontal(m, storage);
      console.log(`horiz for ${n}, ${m} is: ${horiz}`);
  let totalWays = Math.pow(horiz, n) % 1000000007;
      console.log(`total ways for ${n}, ${m} is: ${totalWays}`);
  let notSolidWays = 0;
  for (let i = 1; i <= m-1; i += 1){
    notSolidWays += ( recLegoBlocks(n, i, storage) * Math.pow(countHorizontal(m-i, storage), n) )
      % 1000000007;
  }
  notSolidWays = notSolidWays % 1000000007;
      console.log(`notSolidWays ways for ${n}, ${m} is: ${notSolidWays}`);
  storage[`LB${n}_${m}`] = (totalWays - notSolidWays) % 1000000007;
  return storage[`LB${n}_${m}`];
}
function countHorizontal(m){
  return recursiveHorizontal(m, arguments[1] || {});
};
function recursiveHorizontal(left, storage){
  if (storage[left]){
    return storage[left]
  }
  if (left === 0){
    return 1;
  }
  if (left < 0){
    return 0;
  }
  let result = 0;
  for (let i = 1; i <= 4; i += 1){
    result += recursiveHorizontal(left - i, storage);
  }
  storage[left] = result % 1000000007;
      //console.log(`ways for ${left} is: ${result}`);
  return result % 1000000007;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        let result = legoBlocks(n, m);

        ws.write(result + "\n");
    }

    ws.end();
}
