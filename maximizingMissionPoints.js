//https://www.hackerrank.com/challenges/maximizing-mission-points/problem

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



function main() {
    const nD_latD_long = readLine().split(' ');

    const n = parseInt(nD_latD_long[0], 10);

    const d_lat = parseInt(nD_latD_long[1], 10);

    const d_long = parseInt(nD_latD_long[2], 10);

    let cities = [];

    for (let nItr = 0; nItr < n; nItr++) {
        const latitudeLongitude = readLine().split(' ');

        const latitude = parseInt(latitudeLongitude[0], 10);

        const longitude = parseInt(latitudeLongitude[1], 10);

        const height = parseInt(latitudeLongitude[2], 10);

        const points = parseInt(latitudeLongitude[3], 10);

        cities.push({latitude, longitude, height, points});
    }

    console.log(findMaxPoints(cities));
}
function findMaxPoints(cities){
  cities.sort( (a,b) => {
    return a.height - b.height;
  })
  let blocks = [];

}
function traverse(cities){
  let start = findFirstPositive(cities);
   = getReachableCities(cities, currentCity);
}
function findFirstPositive(cities){
  for (let city = 0; city < cities.length; city += 1){
    if (cities[city].points > 0){
      return city; //or cities of i
    }
  }
  throw "0"; //no positives, answer is 0;
}
function getReachableCities(cities, currentCity){
  let reachableCities = [];
  let citiesOver = 1;
  while ( cities[ currentCity + citiesOver ]. )
}
