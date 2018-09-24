const { expect } = require('chai');
const { runFromFile } = require('./reading');
const { kingdomDivision } = require('../kingdomDivision');

describe.only('kingdomDivision', () => {
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
  xit('returns 920705005 for input 11', async () => {
    const output = await runFromFile(
      './testData/kingdomDivisionInput11.txt',
      parseAndRunKingdomDivision
    );
    const expectedOutput = 920705005;
    expect(output).to.equal(expectedOutput);
  });
  afterEach(() => {});
});

function parseAndRunKingdomDivision(text) {
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

  return kingdomDivision(n, roads);

  function readLine() {
    return inputString[currentLine++];
  }
}
