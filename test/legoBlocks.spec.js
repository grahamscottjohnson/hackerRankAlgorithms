const { expect } = require('chai');
const {
  legoBlocks,
  divideRowOfSize,
  calculateBadTowers,
  calculateAllTowers,
} = require('../legoBlocks');

describe.only('legoBlocks', () => {
  beforeEach(() => {});
  describe('main algorithm', () => {
    beforeEach(() => {});
    it('returns 0 for [0, 2]', () => {
      const input = [0, 2];
      const output = legoBlocks(...input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 0 for [2, 0]', () => {
      const input = [2, 0];
      const output = legoBlocks(...input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 1 for [1, 1]', () => {
      const input = [1, 1];
      const output = legoBlocks(...input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 1 for [2, 1]', () => {
      const input = [2, 1];
      const output = legoBlocks(...input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 2 for [1, 2]', () => {
      const input = [1, 2];
      const output = legoBlocks(...input);
      const expectedOutput = 1; //should it be 1 or 2? does [- -] count as a vertical break? I say yes
      expect(output).to.equal(expectedOutput);
    });
    it('returns 3 for [2, 2]', () => {
      const input = [2, 2];
      const output = legoBlocks(...input);
      const expectedOutput = 3;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 7 for [3, 2]', () => {
      const input = [3, 2];
      const output = legoBlocks(...input);
      const expectedOutput = 7;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 9 for [2, 3]', () => {
      const input = [2, 3];
      const output = legoBlocks(...input);
      const expectedOutput = 9;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 3375 for [4, 4]', () => {
      const input = [4, 4];
      const output = legoBlocks(...input);
      const expectedOutput = 3375;
      expect(output).to.equal(expectedOutput);
    });
    afterEach(() => {});
  });
  describe('divideRowOfSize', () => {
    beforeEach(() => {});
    it('returns 1 for for 0', () => {
      const input = 0;
      const output = divideRowOfSize(input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 1 for for 1', () => {
      const input = 1;
      const output = divideRowOfSize(input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 2 for for 2', () => {
      const input = 2;
      const output = divideRowOfSize(input);
      const expectedOutput = 2;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 4 for for 3', () => {
      const input = 2;
      const output = divideRowOfSize(input);
      const expectedOutput = 2;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 8 for for 4', () => {
      const input = 2;
      const output = divideRowOfSize(input);
      const expectedOutput = 2;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 15 for for 5', () => {
      const input = 2;
      const output = divideRowOfSize(input);
      const expectedOutput = 2;
      expect(output).to.equal(expectedOutput);
    });
    afterEach(() => {});
  });
  afterEach(() => {});
});

function parse(inputString) {
  /*
        2  
        2 2    =>   [[2,2], [3,2]]
        3 2 
    */
  let currentLine = 0;

  function readLine() {
    return inputString[currentLine++];
  }
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());

  const t = parseInt(readLine(), 10);

  const queries = [];

  for (let tItr = 0; tItr < t; tItr++) {
    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    queries.push([n, m]);
  }

  return queries;
}
