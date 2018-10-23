//https://www.hackerrank.com/challenges/kingdom-division/problem

'use strict';

class City {
  constructor(id) {
    this.id = id;
    this._neighbors = new Map();
    //ways to divide city based on if parent team is same or different as this cities team
    this.same = null;
    this.different = null;
    this.testWays = null;
  }

  get ways() {
    return this.same + this.different;
  }

  get neighbors() {
    return Array.from(this._neighbors.values());
  }

  addNeighbor(city) {
    this._neighbors.set(city.id, city);
  }

  getNeighbor(id) {
    return this._neighbors.get(id);
  }

  connectTo(city) {
    this.addNeighbor(city);
    city.addNeighbor(this);
  }

  filterVisitedNeighbors(visited) {
    this._neighbors.forEach(city => {
      if (visited.has(city.id)) {
        this._neighbors.delete(city.id);
      }
    });
  }

  isLeaf() {
    return this._neighbors.size === 0;
  }

  initializeDifferent() {
    if (this.isLeaf()) {
      this.different = 0;
    } else {
      const allWays = this.neighbors.reduce((accum, currentNeighbor) => {
        return (accum * currentNeighbor.ways) % 1000000007;
      }, 1);
      const waysThatStrandThisAlone = this.neighbors.reduce(
        (accum, currentNeighbor) => {
          return (accum * currentNeighbor.different) % 1000000007;
        },
        1
      );
      this.different = allWays - waysThatStrandThisAlone;
    }
  }

  initializeSame() {
    this.same = this.neighbors.reduce((accum, currentNeighbor) => {
      return (accum * currentNeighbor.ways) % 1000000007;
    }, 1);
  }
}

class Kingdom {
  constructor(n, roads) {
    this.cities = new Map();
    this.initializeCities(n);
    this.connectAllCities(roads);
  }

  values() {
    return this.cities.values();
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

  get rootCity() {
    return this.kingdom.values().next().value;
  }

  postOrderTraverseKingdom(callback) {
    this.clearVisited();
    const stack = [this.rootCity];
    stack.peek = function() {
      return this[this.length - 1];
    };
    while (stack.length > 0) {
      const city = stack.peek();
      if (!this.visited.has(city.id)) {
        this.visited.add(city.id);
        city.filterVisitedNeighbors(this.visited);
        stack.push(...city.neighbors);
      } else {
        callback(city);
        stack.pop();
      }
    }
    return this.rootCity;
  }

  clearVisited() {
    this.visited = new Set();
  }

  containsCycle() {
    this.clearVisited();
    let prev = null;
    const stack = [this.rootCity];
    stack.peek = function() {
      return this[this.length - 1];
    };
    while (stack.length > 0) {
      const city = stack.pop();
      if (this.visited.has(city.id)) {
        return true;
      } else {
        this.visited.add(city.id);
        city.neighbors.forEach(neighbor => {
          if (neighbor !== city.prev) {
            neighbor.prev = city;
            stack.push(neighbor);
          }
        });
      }
    }
    return false;
  }
}

class KingdomDivisionAlgorithm {
  constructor(n, roads) {
    const kingdom = new Kingdom(n, roads);
    this.kingdomTraverser = new KingdomTraverser(kingdom);
  }

  solve() {
    const rootCity = this.kingdomTraverser.postOrderTraverseKingdom(
      this.inspectCity.bind(this)
    );
    return mod(2 * rootCity.different, 1000000007);
  }

  solveWithTestWays() {
    const rootCity = this.kingdomTraverser.postOrderTraverseKingdom(
      this.inspectCity.bind(this)
    );
    return mod(rootCity.testWays, 1000000007);
  }

  inspectCity(city) {
    city.initializeSame();
    city.initializeDifferent();
    city.initializeTestWays();
  }

  containsCycle() {
    return this.kingdomTraverser.containsCycle();
  }
}

function kingdomDivision(n, roads) {
  const algorithm = new KingdomDivisionAlgorithm(n, roads);
  return algorithm.solve();
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

module.exports = {
  kingdomDivision,
  City,
  KingdomTraverser,
  KingdomDivisionAlgorithm,
};
