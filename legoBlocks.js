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

let storage = {
  0: {
    combinations: 1,
    sets: 1,
    blocks: {
        total: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0
    }
  }
}
function legoBlocks(n, m) {
//n height, m width
  if (storage[`${n}_${m}`]){
    return storage[`${n}_${m}`];
  }
  let horiz = countHorizontal(m, storage).combinations
      console.log(`horiz for ${n}, ${m} is: ${horiz}`);
  let totalWays = Math.pow(horiz, n) % 1000000007;
      console.log(`total ways for ${n}, ${m} is: ${totalWays}`);
  let notSolidWays = 0;
  for (let i = 1; i <= m-1; i += 1){
    notSolidWays += legoBlocks(n, i) * Math.pow(storage[m-i].combinations, n) % 1000000007;
  }
      console.log(`notSolidWays ways for ${n}, ${m} is: ${notSolidWays}`);
  storage[`${n}_${m}`] = totalWays - (notSolidWays % 1000000007);
  return storage[`${n}_${m}`];
}
function countHorizontal(m, storage){
  if (storage[m]){
    return storage[m];
  }
  countHorizontal(m-1, storage); //go find all the prior ways
  storage[m] = {
    combinations: combineCombinations(m, storage),
    sets: combineSets(m, storage),
    blocks: combineBlocks(m, storage)
  }
  return storage[m];
}
function combineCombinations(m, storage){ //requires storage to be full
  //currently overcounts
  let result = 0;
  for (let i = 1; i <= 4; i += 1){
    if (m-i >= 0){
      result += ( storage[m-i].sets + storage[m-i].blocks.total - storage[m-i].blocks[i]) //overcounts because  2 1n 1 === 2 1 1n,
      //that's why there's a subtract
      //* storage[m-i].combinations )
         % 1000000007;
        //try instead to keep count number of 1,2,3,4 blocks in all combinations
    }
  }
  return result % 1000000007;
}
function combineSets(m, storage){
  let result = 0;
  for (let i = 1; i <= 4; i += 1){ //isn't this overcounting? 1 _ 4 === 4 _ 1, but I'm counting it twice
    if (m-i >= 0){
      result += storage[m-i].sets;
    }
  }
  return result % 1000000007;
}
function combineBlocks(m, storage){
  let result = {
    total: 0
  };
  //initialize
  for (let j = 1; j <= 4; j += 1){
    result[j] = 0;
  }
  //append to get m
  for (let i = 1; i <= 4; i += 1){
    //start with previous
    for (let j = 1; j <= 4; j += 1){
      result[j] += (storage[m-i] ? storage[m-i].blocks[j] : 0);
    }
    //add new blocks. Number of new blocks is 1 for every set since we're adding on a block
    //this is wrong. We aren't adding sets amount of sets each time, that would repeat
    if (m-i >= 0){
      result.total += ( storage[m-i].sets + storage[m-i].blocks.total ) % 1000000007;
      result[i] += storage[m-i].sets;
    }
  }
  for (let prop in result){
    result[prop] = result[prop] % 1000000007;
  }
  return result;
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
// function countWays(m, blocks, storage){
//   //base case
//   if (blocks.length === 0 || m === 0){
//     return 0;
//   }
//   //check storage
//   if (storage[`${m}_${blocks.length}`]){
//     return storage[`${m}_${blocks.length}`].ways;
//   }
//   //count unique legoBlocks
//     //same thing as count coin currency
//   else if (blocks[0] < m){
//     if (storage[m] === undefined){
//       storage[m] = [[]];
//     }
//     if (storage[m-blocks[0]] === undefined){
//       storage[m-blocks[0]] = [[]];
//     }
//     storage[m] = storage[m].concat(storage[m-blocks[0]].map( (combination) => {
//       return combination.concat([blocks[0]]);
//     }));
//     storage[`${m}_${blocks.length}`] = {};
//     storage[`${m}_${blocks.length}`].ways = 1 + countWays(m - blocks[0], blocks, storage)
//       + countWays(m, blocks.slice(1), storage);
//     // storage[`${m}_${blocks.length}`][blocks[0]] = storage[`${m}_${blocks.length}`][blocks[0]] + 1 || 1;
//       //above won't work, unless i also include it in the storage section. (which i can do)
//       //but in order to make this update, would go from O(m) to O(m^2)
//     return storage[`${m}_${blocks.length}`].ways;
//   }
//   else{
//     storage[`${m}_${blocks.length}`] = {};
//     storage[`${m}_${blocks.length}`].ways = countWays(m, blocks.slice(1), storage);
//     return storage[`${m}_${blocks.length}`].ways
//   }
//   //count combinations of those blocks
//
// }
// let obj = {0: [[]]};
// console.log(countWays(5, [4, 3, 2, 1], obj));
// console.log(obj[5]);
// // console.log(countWays(10, [4, 3, 2, 1], {}));
// // console.log(countWays(100, [4, 3, 2, 1], {}));
// // console.log(countWays(500, [4, 3, 2, 1], {}));


//some logic
//# of combos is
// insert (1) to m-1 (keep track of 1 blocks) //written in other doc
// + combos w/o 2 of m - 2
// + combos w/o 3 of m - 3
// + combos w/o 4 of m - 4
//
// # of combos w/0 2 for m is
//   # of combos w/0 2 for m-1
//   # of combos w/0 2 && w/o 3 for m-3
//   # of combos w/0 2 && w/o 4 for m-4
//
// # of combos w/0 3 for m is
//   # of combos w/0 3 for m-1
//   # of combos w/0 2 && w/o 3 for m-2
//   # of combos w/0 3 && w/o 4 for m-4
//
// # of combos w/0 4 for m is
//   # of combos w/0 4 for m-1
//   # of combos w/0 2 && w/o 4 for m-2
//   # of combos w/0 3 && w/o 4 for m-3

data = {
  0: {
    cobminations: 1,
    sets: 1,
    blocks: {
      total: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0
    },
    not:{
      2: 0,
      3: 0,
      4: 0,
      "2_3": 0,
      "2_4": 0,
      "3_4": 0
    }
  }
}
function countHorizontal(m, storage){
  if (storage[m]){
    return storage[m];
  }
  countHorizontal(m-1, storage); //go find all the prior ways
  storage[m] = {
    combinations: combineCombinations(m, storage),
    sets: combineSets(m, storage),
    blocks: combineBlocks(m, storage),
    not: combineNot(m, storage)
  }
  return storage[m];
}

function combineCombinations(m, storage){
  let result = 0;
  //count 1's
  result += previousCombinations(m) + numberOfWaysToInsert1(m) - numberOfPrevious1(m); //(i.e repeats)
  //count 2's
  result += previousCombinationsNot(m, 2);
  result += previousCombinationsNot(m, 3);
  result += previousCombinationsNot(m, 4);
  return result % 1000000007;
  function previousCombinations(m){
    return storage[m-1].combinations;
  }
  function numberOfWaysToInsert1(m){
    // ----/-----/---- where each - is a block and each / is a new set.
    //Can place 1 betwen any character above
    return storage[m-1].blocks + storage[m-1].sets
  }
  function numberOfPrevious1(m){
    return storage[m-1].blocks[1];
  }
  function previousCombinationsNot(m, block){
    return storage[m-block].not[block];
  }
}
function combineNot(m, storage){
  //pretty sure this is all wrong.
  return result = {
    //TODO handle m-i < 0
    2: storage[m-1].not[2] + storage[m-3].not["2_3"] + storage[m-4].not["2_4"],
    3: storage[m-1].not[3] + storage[m-2].not["2_3"] + storage[m-4].not["3_4"],
    4: storage[m-1].not[4] + storage[m-2].not["2_4"] + storage[m-3].not["3_4"],
    "2_3": storage[m-1].not["2_3"] + 1, //storage[m-4].not["2_3_4"],
    "2_4": storage[m-1].not["2_4"] + 1,
    "3_4": storage[m-1].not["3_4"] + 1 //storage[m-2].not["2_3_4"]
  }
}


function combine1Blocks(m, storage){
  //change to only count 1 blocks
  let result = {
    total: 0
  };
  //initialize
  for (let j = 1; j <= 4; j += 1){
    result[j] = 0;
  }
  //append to get m
  for (let i = 1; i <= 4; i += 1){
    //start with previous
    for (let j = 1; j <= 4; j += 1){
      result[j] += (storage[m-i] ? storage[m-i].blocks[j] : 0);
    }
    //add new blocks. Number of new blocks is 1 for every set since we're adding on a block
    //this is wrong. We aren't adding sets amount of sets each time, that would repeat
    if (m-i >= 0){
      result.total += ( storage[m-i].sets + storage[m-i].blocks.total ) % 1000000007;
      result[i] += storage[m-i].sets;
    }
  }
  for (let prop in result){
    result[prop] = result[prop] % 1000000007;
  }
  return result;
}
