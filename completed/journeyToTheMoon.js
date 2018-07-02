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

// Complete the journeyToMoon function below.
function journeyToMoon(num, astronaut) {
    //set up
    const teams = {};
    const visited = {};
    for (let index = 0; index < num; index += 1){
        visited[index] = false;
        teams[index] = {};
        Object.defineProperty(teams[index], 'key', {
            value: index,
        });
        Object.defineProperty(teams[index], 'size', {
            value: 1,
            writable: true,
        });
        Object.defineProperty(teams[index], 'root', {
            value: teams[index],
            writable: true,
        });
        Object.defineProperty(teams[index], 'isRoot', {
            value: true,
            writable: true,
        });
    }
    //break the input into country objects which are teams
    astronaut.forEach( pair => {
        let countryARoot = findRoot(teams[pair[0]].root);
        let countryBRoot = findRoot(teams[pair[1]].root);
        if ( countryARoot !== countryBRoot ){
            countryARoot[countryBRoot.key] = countryBRoot; //put B into A
            countryBRoot.isRoot = false;
            countryBRoot.root = countryARoot;
        } 
    });
    //count number in each country
    const countryAmounts = [];
    for (let spacemanKey in teams){
        const spaceman = teams[spacemanKey];
        if (!visited[spaceman.key] && spaceman.isRoot){
            visitSpaceman( spaceman, visited );
            countryAmounts.push( spaceman.size );
        }
    }
    //count pairs
    let permutations = 0;
    countryAmounts.forEach( amount => {
        permutations += amount * (num-amount);
    });
    const pairs = permutations / 2;
    return pairs;
}

function findRoot( spaceman ){ //the root could point to something that has an even bigger root, so keep going till you find it
    //should be O(log(n)) time because the outside spacment could be at worst a balanced binary tree.
    //except that we set the root afterwords, so practically this could be less than log(n)
    if (spaceman.root.key === spaceman.key){
        return spaceman;
    } else {
        spaceman.root = findRoot(spaceman.root);
        return spaceman.root;
    }
}

function visitSpaceman( spaceman, visited ){ //modify the size/visited of every child and self
    //should be O(n) time because you shouldn't visit the same spaceman twice, so there are n visits.
    visited[spaceman.key] = true;
    let team = Object.keys(spaceman)
    if ( team.length > 0 ){ //has other teamMembers,
        let count = 0;
        team.forEach( teamMemberKey => {
            visitSpaceman( spaceman[teamMemberKey], visited );
            count += spaceman[teamMemberKey].size;
        });
        spaceman.size += count;
    }
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const np = readLine().split(' ');

    const n = parseInt(np[0], 10);

    const p = parseInt(np[1], 10);

    let astronaut = Array(p);

    for (let i = 0; i < p; i++) {
        astronaut[i] = readLine().split(' ').map(astronautTemp => parseInt(astronautTemp, 10));
    }

    let result = journeyToMoon(n, astronaut);

    ws.write(result + "\n");

    ws.end();
}
