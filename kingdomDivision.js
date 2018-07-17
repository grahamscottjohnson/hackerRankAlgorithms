//https://www.hackerrank.com/challenges/kingdom-division/problem

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

class City{
    constructor(id){
        this.id = id;
        this.neighbors = {};
    }
    add(city){
        this.neighbors[city.id] = city;
    }
    get(id){
        return this.neighbors[id];
    }
    isLeaf(){
        return Object.values(this.neighbors).length === 0
    }
}

City.connect = (city1, city2) => {
    city1.add(city2);
    city2.add(city1);
}

const makeKingdom = (roads) => {
    const allCities = {};
    roads.forEach( (road) => {
        let [city1Index, city2Index] = road;
        if (city1Index === city2Index){
            console.log('bad input, city should not connect to itself')
        } else {
            const city1 = allCities[city1Index] || new City(city1Index);
            const city2 = allCities[city2Index] || new City(city2Index);
            City.connect(city1, city2);
            allCities[city1Index] = city1;
            allCities[city2Index] = city2;
        }
    })
    const visited = {};
    trimCycles(allCities[1], visited);
    return allCities[1];
}

function trimCycles( city, visited ){   
    visited[city.id] = true;
    const newNeighbors = filterNeighbors(visited, city.neighbors);
    city.neighbors = newNeighbors;
    Object.values(newNeighbors).forEach( neighbor => {
        trimCycles(neighbor, visited);
    });

}

function filterNeighbors(visited, neighbors){
    const newNeighbors = {};
    Object.values(neighbors).forEach( (neighbor) => {
        if (visited[neighbor.id] == undefined){
            newNeighbors[neighbor.id] = neighbor;
        }
    });
    return newNeighbors;
}

function kingdomDivision(n, roads) {
    //set up
    const root = makeKingdom(roads);
    const waysToDivideGivenCity = {};
    //run recusion on node
    const ways = kingdomDivisionRecursion(waysToDivideGivenCity, root, 'a') 
        + kingdomDivisionRecursion(waysToDivideGivenCity, root, 'b')
    return ways % 1000000007;
}

function kingdomDivisionRecursion(hash, city, cityTeam, parentTeam){ //teams are 'a' and 'b'
    //base cases
    if (city == null){
        throw new Error("city can't be null");
    }
    if (hash[city.id + cityTeam + parentTeam]){
        return hash[city.id + cityTeam + parentTeam]
    }
    if (city.isLeaf()){
        return cityTeam === parentTeam ? 1 : 0;
    } else {
        return handleRecursiveStep(hash, city, cityTeam, parentTeam);
    }
}
function handleRecursiveStep(hash, city, cityTeam, parentTeam){
    let otherTeam = notTeam(cityTeam);
    const neighborBothWays = Object.values(city.neighbors).map( (neighbor) => {
        return kingdomDivisionRecursion(hash, neighbor, cityTeam, cityTeam)
        + kingdomDivisionRecursion(hash, neighbor, otherTeam, cityTeam);
    })
    let ways = neighborBothWays.reduce( (accum, current) => {
        return (accum * current) % 1000000007;
    }, 1);
    if (parentTeam !== cityTeam){
        const neighborOppositeWays = Object.values(city.neighbors).map( (neighbor) => {
            return kingdomDivisionRecursion(hash, neighbor, otherTeam, cityTeam);
        })
        ways -= neighborOppositeWays.reduce( (accum, current) => {
            return (accum * current) % 1000000007;
        }, 1);
    }
    hash[city.id + cityTeam + parentTeam] = ways;
    return ways;
}

function notTeam(team){
    return team === 'a' ? 'b' : 'a';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let roads = Array(n-1);

    for (let i = 0; i < n-1; i++) {
        roads[i] = readLine().split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    let result = kingdomDivision(n, roads);

    ws.write(result + "\n");

    ws.end();
}
