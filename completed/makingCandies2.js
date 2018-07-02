//https://www.hackerrank.com/challenges/making-candies/problem
//1 1 6 45
//16
//28 81 64143 93888052920
//2449
//1 1 1000000000000 1000000000000
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

// Complete the minimumPasses function below.
function minimumPasses(m, w, p, n) {
  //machines, workers, price, number desired
  if (n === 0){return 0};
  if ( n <= p ){
    return turnsLeft( m, w, 0, n);
  }
  let pastResources = [{machines: m, workers: w, inventory: 0, passes: 0}];
  while ( !isFinished( pastResources, n ) ){
    pastResources.push(
      getNewResources(
        pastResources[pastResources.length - 1],
        p, //price
        n //target
      )
    );
    // if (pastResources.length > 200){
    //   pastResources.shift();
    // }
  }
  return countBack( n, pastResources[pastResources.length - 1].passes, pastResources );
}
function getNewResources( lastResource, price, target){
  let newInventory = produceInventory(lastResource.machines, lastResource.workers, lastResource.inventory);
  let nextPasses = lastResource.passes + 1;
  if ( newInventory >= target ){
    return { //stop counting, you're done.
      machines: lastResource.machines,
      workers: lastResource.workers,
      inventory: newInventory,
      passes: nextPasses,
      isFinished: true
    };
  }
  if ( newInventory < .5 * price ){
    let turnsTillPurchase = turnsLeft(
        lastResource.machines,
        lastResource.workers,
        newInventory,
        price );
    newInventory += lastResource.machines * lastResource.workers * turnsTillPurchase;
    nextPasses += turnsTillPurchase;
    if ( newInventory >= target ){
      return { //stop counting, you're done.
        machines: lastResource.machines,
        workers: lastResource.workers,
        inventory: newInventory,
        passes: nextPasses,
        isFinished: true
      };
    }
  }
  let newResources = buy( lastResource.machines, lastResource.workers, newInventory, price );
  newResources.passes = nextPasses;
  return newResources;
}
function isFinished( pastResources, target){
  return pastResources[pastResources.length - 1].isFinished;
}
function produceInventory(machines, workers, inventory){
  return inventory + machines * workers;
}
function buy(machines, workers, inventory, price){
  let purchases = Math.floor( inventory / price );
  let leftover = inventory % price;
  return purchaseResourcesToEqualize( machines, workers, purchases, leftover );
}
function purchaseResources( machines, workers, purchases, leftover ){
  let newMachines = machines + Math.floor(purchases / 2);
  let newWorkers = workers + Math.floor(purchases / 2);
  if (purchases % 2 === 1){
    if (machines < workers){
      newMachines += 1;
    }
    else{
      newWorkers += 1;
    }
  }
  return {
    machines: newMachines,
    workers: newWorkers,
    inventory: leftover
  }
}
function purchaseResourcesToEqualize( machines, workers, purchases, leftover){
  while ( purchases > 0 ){ //TODO needs to be optimized
    let addon = Math.min( Math.abs( workers - machines ), purchases);
    if ( workers === machines ){
      return purchaseResources( machines, workers, purchases, leftover );
    }
    if (machines < workers){
      machines += addon;
    }
    else{
      workers += addon;
    }
    purchases -= addon;
  }
  return {
    machines,
    workers,
    inventory: leftover
  }
}
function countBack( target, maxPasses, pastResources){
  //what if we stopped buying machines and workers and just held inventory.
  //would that be faster?
  // if (pastResources.length !== maxPasses){
  //   throw "error countBack, passes don't aline with pastResources";
  // }
  for( let pass = pastResources.length - 2; pass >= 0; pass -= 1){
    let moreTurns = turnsLeft( pastResources[pass].machines,
      pastResources[pass].workers, pastResources[pass].inventory, target );
    if ( pastResources[pass].passes + moreTurns > maxPasses ){
      //break, we can't do better
      return maxPasses;
    }
    else{
      maxPasses = pastResources[pass].passes + moreTurns;
    }
  }
  return maxPasses;
}
function turnsLeft(machines, workers, inventory, target){
  let candiesLeft = target - inventory;
  let production = machines * workers;
  // return Math.ceil( round(candiesLeft / production , 8) ); //error as a result of rounding
  return Math.ceil( candiesLeft / production );
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const mwpn = readLine().split(' ');

    const m = parseInt(mwpn[0], 10);

    const w = parseInt(mwpn[1], 10);

    const p = parseInt(mwpn[2], 10);

    const n = parseInt(mwpn[3], 10);

    let result = minimumPasses(m, w, p, n);

    ws.write(result + "\n");

    ws.end();
}
