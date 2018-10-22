//https://www.hackerrank.com/challenges/kingdom-division/problem

'use strict';

class City {
  constructor(id) {
    this.id = id;
    this.neighbors = new Map();
    //ways to divide city based on if parent team is same or different as this cities team
    this.same = 0;
    this.different = 0;
  }

  get ways() {
    return 2 * (this.same + this.different); //*2 because two different teams
  }

  addNeighbor(city) {
    this.neighbors.set(city.id, city);
  }

  getNeighbor(id) {
    return this.neighbors.get(id);
  }

  connectTo(city) {
    this.addNeighbor(city);
    city.addNeighbor(this);
  }

  filterVisitedNeighbors(visited) {
    this.neighbors.forEach(city => {
      if (visited.has(city.id)) {
        this.neighbors.delete(city.id);
      }
    });
  }

  isLeaf() {
    return this.neighbors.size === 0;
  }

  initiliazeDifferent() {
    if (this.isLeaf()) {
      this.different = 0;
    } else {
      const bothWays = Array.from(this.neighbors).reduce((accum, current) => {
        return (accum * current.ways) % 1000000007;
      }, 1);
      this.different =
        bothWays -
        Array.from(this.neighbors).reduce((accum, current) => {
          return (accum * current.different) % 1000000007;
        }, 1);
    }
  }

  initializeSame() {
    this.same = Array.from(this.neighbors).reduce((accum, current) => {
      return (accum * current.ways) % 1000000007;
    }, 1);
  }
}

class Kingdom {
  constructor(n, roads) {
    this.cities = new Map();
    this.initializeCities(n);
    this.connectAllCities(roads);
  }

  initializeCities(n) {
    for (let i = 1; i <= n; i++) {
      this.cities.set(i, new City(i));
    }
  }

  connectAllCities(roads) {
    roads.forEach(this.connectCities.bind(this));
  }

  connectCities([city1Index, city2Index]) {
    const [city1, city2] = [this.getCity(city1Index), this.getCity(city2Index)];
    city1.connectTo(city2);
  }

  getCity(index) {
    return this.cities.get(index);
  }
}

class KingdomTraverser {
  constructor(kingdom) {
    this.visited = new Set();
    this.kingdom = kingdom;
  }

  traverseKingdomWithCallback(callback) {
    this.clearVisited();
    let rootCity = this.kingdom.values()[0];
    const stack = [rootCity];
    while (stack.length > 0) {
      // const city = stack.pop() stack.peek()
      const id = city.id;
      city.filterVisitedNeighbors(this.visited);
      if (!this.visited.has(id)) {
        this.visited.add(id);
        callback(city);
      }
    }
    this.kingdom.cities.forEach(city => {
      rootCity = rootCity || city;
      const id = city.id;
      if (!this.visited.has(id)) {
        this.visited.add(id);
        city.filterVisitedNeighbors(this.visited);
        callback(city);
      }
    });
    return rootCity;
  }

  clearVisited() {
    this.visited = new Set();
  }
}

class KingdomDivisionAlgorithm {
  constructor(kingdom) {
    this.visited = new Set();
    this.cityDivisions = new Map();
    this.kingdomTraverser = new KingdomTraverser(kingdom);
  }

  solve() {
    const rootCity = this.kingdomTraverser.traverseKingdomWithCallback(
      this.inspectCity.bind(this)
    );
    return 2 * rootCity.different;
  }

  inspectCity(city) {
    city.initiliazeSame();
    city.initializeDifferent();
  }
}

const makeKingdom = roads => {
  const allCities = {};
  roads.forEach(road => {
    let [city1Index, city2Index] = road;
    if (city1Index === city2Index) {
      console.log('bad input, city should not connect to itself');
    } else {
      const city1 = allCities[city1Index] || new City(city1Index);
      const city2 = allCities[city2Index] || new City(city2Index);
      city1.connectTo(city2);
      allCities[city1Index] = city1;
      allCities[city2Index] = city2;
    }
  });
  const visited = {};
  trimCycles(allCities[1], visited);
  return allCities[1];
};

function trimCycles(city, visited) {
  visited[city.id] = true;
  const newNeighbors = filterNeighbors(visited, city.neighbors);
  city.neighbors = newNeighbors;
  Object.values(newNeighbors).forEach(neighbor => {
    trimCycles(neighbor, visited);
  });
}

function filterNeighbors(visited, neighbors) {
  const newNeighbors = {};
  Object.values(neighbors).forEach(neighbor => {
    if (visited[neighbor.id] == undefined) {
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
  const ways =
    kingdomDivisionRecursion(waysToDivideGivenCity, root, 'a') +
    kingdomDivisionRecursion(waysToDivideGivenCity, root, 'b');
  return ways % 1000000007;
}

function kingdomDivisionRecursion(hash, city, cityTeam, parentTeam) {
  //teams are 'a' and 'b'
  //base cases
  if (city == null) {
    throw new Error("city can't be null");
  }
  if (hash[city.id + cityTeam + parentTeam]) {
    return hash[city.id + cityTeam + parentTeam];
  }
  if (city.isLeaf()) {
    return cityTeam === parentTeam ? 1 : 0;
  } else {
    return handleRecursiveStep(hash, city, cityTeam, parentTeam);
  }
}
function handleRecursiveStep(hash, city, cityTeam, parentTeam) {
  let otherTeam = notTeam(cityTeam);
  const neighborBothWays = Object.values(city.neighbors).map(neighbor => {
    return (
      kingdomDivisionRecursion(hash, neighbor, cityTeam, cityTeam) +
      kingdomDivisionRecursion(hash, neighbor, otherTeam, cityTeam)
    );
  });
  let ways = neighborBothWays.reduce((accum, current) => {
    return (accum * current) % 1000000007;
  }, 1);
  if (parentTeam !== cityTeam) {
    const neighborOppositeWays = Object.values(city.neighbors).map(neighbor => {
      return kingdomDivisionRecursion(hash, neighbor, otherTeam, cityTeam);
    });
    ways -= neighborOppositeWays.reduce((accum, current) => {
      return (accum * current) % 1000000007;
    }, 1);
  }
  hash[city.id + cityTeam + parentTeam] = ways;
  return ways;
}

function notTeam(team) {
  return team === 'a' ? 'b' : 'a';
}

module.exports = {
  kingdomDivision,
};
