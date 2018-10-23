const { expect } = require('chai');
const { runFromFile, readFromFile } = require('../../test/reading');
const {
  kingdomDivision,
  City,
  KingdomDivisionAlgorithm,
} = require('../kingdomDivision');

describe('City', () => {
  it('initializes different', () => {
    const city1 = new City(1);
    const city2 = new City(2);
    city1.addNeighbor(city2);
    city2.initializeSame();
    city2.initializeDifferent();
    expect(city2.different).to.equal(0);
    city1.initializeDifferent();
    expect(city1.different).to.equal(1);
  });
  it('initializes same', () => {
    const city1 = new City(1);
    const city2 = new City(2);
    city1.addNeighbor(city2);
    city2.initializeSame();
    city2.initializeDifferent();
    expect(city2.same).to.equal(1);
    city1.initializeSame();
    expect(city1.same).to.equal(1);
  });
});

describe('Algo.containsCycle', () => {
  it('returns false for five cities with one root branching in two directions', () => {
    const input = [5, [[1, 2], [2, 3], [1, 4], [4, 5]]];
    const algo = new KingdomDivisionAlgorithm(...input);
    const output = algo.containsCycle();
    const expectedOutput = false;
    expect(output).to.equal(expectedOutput);
  });
  it('returns true for simple triangle', () => {
    const input = [3, [[1, 2], [2, 3], [3, 1]]];
    const algo = new KingdomDivisionAlgorithm(...input);
    const output = algo.containsCycle();
    const expectedOutput = true;
    expect(output).to.equal(expectedOutput);
  });
  it('returns false for input 4', async () => {
    const input = parse(
      await readFromFile('./testData/kingdomDivisionInput04.txt')
    );
    const algo = new KingdomDivisionAlgorithm(...input);
    const output = algo.containsCycle();
    const expectedOutput = false;
    expect(output).to.equal(expectedOutput);
  });
  it('returns false for input 12', async () => {
    const input = parse(
      await readFromFile('./testData/kingdomDivisionInput12.txt')
    );
    const algo = new KingdomDivisionAlgorithm(...input);
    const output = algo.containsCycle();
    const expectedOutput = false;
    expect(output).to.equal(expectedOutput);
  });
});

describe('kingdomDivision', () => {
  beforeEach(() => {});
  it('returns 2 for two connected cities', () => {
    const output = kingdomDivision(2, [[1, 2]]);
    const expectedOutput = 2;
    expect(output).to.equal(expectedOutput);
  });
  it('returns 2 for one root city with two neighbors', () => {
    const output = kingdomDivision(3, [[1, 2], [1, 3]]);
    const expectedOutput = 2;
    expect(output).to.equal(expectedOutput);
  });
  it('returns 2 for one root city with three neighbors', () => {
    const output = kingdomDivision(4, [[1, 2], [1, 3], [1, 4]]);
    const expectedOutput = 2;
    expect(output).to.equal(expectedOutput);
  });

  it('returns 4 for four cities in a line', () => {
    const output = kingdomDivision(4, [[1, 2], [2, 3], [3, 4]]);
    const expectedOutput = 4;
    expect(output).to.equal(expectedOutput);
  });
  it('returns 6 for five cities with one root branching in two directions', () => {
    const output = kingdomDivision(5, [[1, 2], [2, 3], [1, 4], [4, 5]]);
    const expectedOutput = 6;
    expect(output).to.equal(expectedOutput);
  });
  it('returns 840 for input 4', async () => {
    const output = await runFromFile(
      './testData/kingdomDivisionInput04.txt',
      parseAndRunKingdomDivision
    );
    const expectedOutput = 840;
    expect(output).to.equal(expectedOutput);
  });
  it('returns 920705005 for input 11', async () => {
    const output = await runFromFile(
      './testData/kingdomDivisionInput11.txt',
      parseAndRunKingdomDivision
    );
    const expectedOutput = 920705005;
    expect(output).to.equal(expectedOutput);
  });
  it('returns 838921216 for input 12', async () => {
    const output = await runFromFile(
      './testData/kingdomDivisionInput12.txt',
      parseAndRunKingdomDivision
    );
    const expectedOutput = 838921216;
    expect(output).to.equal(expectedOutput);
  });
  afterEach(() => {});
});

function parse(text) {
  let inputString = text
    .replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));
  let currentLine = 0;

  const n = parseInt(readLine(), 10);

  let roads = Array(n - 1);

  for (let i = 0; i < n - 1; i++) {
    roads[i] = readLine()
      .split(' ')
      .map(roadsTemp => parseInt(roadsTemp, 10));
  }

  return [n, roads];

  function readLine() {
    return inputString[currentLine++];
  }
}

function parseAndRunKingdomDivision(text) {
  return kingdomDivision(...parse(text));
}
