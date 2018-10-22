//https://www.hackerrank.com/challenges/merging-communities/problem

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function(input) {
  _input += input;
});

process.stdin.on('end', function() {
  processData(_input);
});

function processData(input) {
  const queries = parseDataIntoQueries(input);
  const bigMap = parseDataIntoMap(input);
  const resultsOfQueries = executeQueriesOnMap(queries, bigMap);
  printResults(resultsOfQueries);
}

function parseDataIntoQueries(input) {
  //   const sample = `3 6
  //     Q 1
  //     M 1 2
  //     Q 2
  //     M 2 3
  //     Q 3
  //     Q 2`;
  const lines = input.trim().split('\n');
  const queries = [];
  for (let i = 1; i < lines.length; i++) {
    let [type, ...args] = lines[i].split(' ');
    args = args.map(arg => +arg);
    queries.push(new Query(type, args));
  }
  return queries;
}

function parseDataIntoMap(input) {
  const sizeOfMap = getStartingNumber(input);
  return new BigMap(sizeOfMap);
}

function getStartingNumber(input) {
  const startingText = /^\d+\s/;
  const [startingNumber] = input.trim().match(startingText);
  return +startingNumber;
}

function printResults(resultsOfQueries) {
  resultsOfQueries.forEach(result => {
    console.log(result);
  });
}

function executeQueriesOnMap(queries, map) {
  const results = [];
  queries.forEach(query => {
    const result = map.executeQuery(query);
    if (result) {
      results.push(result);
    }
  });
  return results;
}

class Query {
  constructor(type, args) {
    this.type = type;
    this.args = args;
  }
}

class Data {
  constructor(value, community) {
    this.value = value;
    this.community = community;
  }
}

class Community {
  constructor() {
    this.size = 0;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  connect(community) {
    if (!this.left) {
      this.left = community;
      this.size += community.size;
    } else if (!this.right) {
      this.right = community;
      this.size += community.size;
    } else if (!this.parent) {
      this.becomeChildOf(community);
    } else {
      this.smallerChild.add(community);
      this.size += community.size;
    }
  }

  get biggerChild() {
    if (!this.right) return this.left;
    if (!this.left) return this.right;
    return this.right.size > this.left.size ? this.right : this.left;
  }
  get smallerChild() {
    if (!this.right) return this.left;
    if (!this.left) return this.right;
    return this.right.size > this.left.size ? this.left : this.right;
  }
}

class MapQueryCoder {
  constructor(map) {
    this.map = map;
  }
  decode(query) {
    switch (query.type) {
      case 'M':
        return this.map.connect.bind(this.map);
      case 'Q':
        return this.map.getSize.bind(this.map);
      default:
        return this.map.getSize.bind(this.map);
    }
  }
}

class BigMap {
  constructor(size) {
    this.map = this.initializeData(size);
    this.queryCoder = new MapQueryCoder(this);
  }

  initializeData(size) {
    const map = new Map();
    for (let i = 1; i <= size; i++) {
      const data = new Data(i, new Community());
      data.community.add(data);
      map.set(i, data);
    }
    return map;
  }

  get(value) {
    if (!this.map.has(value)) {
      throw new Error(`no key: ${value} in bigMap`);
    }
    return this.map.get(value);
  }

  getSize(value) {
    return this.get(value).community.size;
  }

  connect(val1, val2) {
    const community1 = this.get(val1).community;
    const community2 = this.get(val2).community;
    const smallerCommunity =
      community1.size < community2.size ? community1 : community2;
    const biggerCommunity =
      community1.size < community2.size ? community2 : community1;
    smallerCommunity.forEach(data => {
      biggerCommunity.add(data);
      data.community = biggerCommunity;
    });
  }

  executeQuery(query) {
    const mapFunction = this.queryCoder.decode(query);
    const result = mapFunction(...query.args);
    return result;
  }
}

exports.Query = Query;
exports.BigMap = BigMap;
exports.parseDataIntoMap = parseDataIntoMap;
exports.getStartingNumber = getStartingNumber;
