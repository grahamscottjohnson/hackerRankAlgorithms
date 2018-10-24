const { expect } = require('chai');
const { LegoBlocks } = require('../legoBlocks');
const { readFromFile } = require('./reading');

describe.only('legoBlocks', () => {
  beforeEach(() => {});
  describe('main algorithm', () => {
    beforeEach(() => {});
    it('returns 0 for [0, 2]', () => {
      const input = [0, 2];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 0 for [2, 0]', () => {
      const input = [2, 0];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 1 for [1, 1]', () => {
      const input = [1, 1];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 1 for [2, 1]', () => {
      const input = [2, 1];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 2 for [1, 2]', () => {
      const input = [1, 2];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 1; //should it be 1 or 2? does [- -] count as a vertical break? I say yes
      expect(output).to.equal(expectedOutput);
    });
    it('returns 3 for [2, 2]', () => {
      const input = [2, 2];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 3;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 7 for [3, 2]', () => {
      const input = [3, 2];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 7;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 9 for [2, 3]', () => {
      const input = [2, 3];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 9;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 3375 for [4, 4]', () => {
      const input = [4, 4];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 3375;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 3375 for [4, 4]', () => {
      const input = [4, 4];
      const output = new LegoBlocks().solve(...input);
      const expectedOutput = 3375;
      expect(output).to.equal(expectedOutput);
    });
    it('solves Input 1 from HackerRank', async () => {
      const queries = parseInput(
        await readFromFile('./testData/legoBlocksInput01.txt')
      );
      const outputs = parseOutput(
        await readFromFile('./testData/legoBlocksOutput01.txt')
      );
      queries.forEach((input, index) => {
        const output = new LegoBlocks().calculateAllTowers(...input);
        const expectedOutput = outputs[index];
        expect(output).to.equal(expectedOutput);
      });
    });
    afterEach(() => {});
  });

  describe('divideRowOfSize', () => {
    beforeEach(() => {});
    it('returns 1 for for 0', () => {
      const input = 0;
      const output = new LegoBlocks().divideRowOfSize(input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 1 for for 1', () => {
      const input = 1;
      const output = new LegoBlocks().divideRowOfSize(input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 2 for for 2', () => {
      const input = 2;
      const output = new LegoBlocks().divideRowOfSize(input);
      const expectedOutput = 2;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 4 for for 3', () => {
      const input = 3;
      const output = new LegoBlocks().divideRowOfSize(input);
      const expectedOutput = 4;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 8 for for 4', () => {
      const input = 4;
      const output = new LegoBlocks().divideRowOfSize(input);
      const expectedOutput = 8;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 15 for for 5', () => {
      const input = 5;
      const output = new LegoBlocks().divideRowOfSize(input);
      const expectedOutput = 15;
      expect(output).to.equal(expectedOutput);
    });
    afterEach(() => {});
  });

  describe('caclculateAllTowers', () => {
    beforeEach(() => {});
    it('returns 8 for for [3, 2]', () => {
      const input = [3, 2];
      const output = new LegoBlocks().calculateAllTowers(...input);
      const expectedOutput = 8;
      expect(output).to.equal(expectedOutput);
    });
    afterEach(() => {});
  });

  describe('caclculateBadTowers', () => {
    beforeEach(() => {});
    it('returns 0 for for [3, 1]', () => {
      const input = [3, 1];
      const output = new LegoBlocks().calculateBadTowers(...input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 1 for for [3, 2]', () => {
      const input = [3, 2];
      const output = new LegoBlocks().calculateBadTowers(...input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('returns 7 for for [2,3]', () => {
      const input = [2, 3];
      const output = new LegoBlocks().calculateBadTowers(...input);
      const expectedOutput = 7;
      expect(output).to.equal(expectedOutput);
    });
    afterEach(() => {});
  });
  afterEach(() => {});
});

function parseInput(inputString) {
  /*
        2  
        2 2    =>   [[2,2], [3,2]]
        3 2 
    */
  const readLine = createReader(inputString);
  const t = parseInt(readLine(), 10);
  return parseQueries(readLine, t);
}
function parseOutput(inputString) {
  /*
          2 2    =>   [[2,2], [3,2]]
          3 2 
      */
  const readLine = createReader(inputString);
  return parseNumbers(readLine, inputString.length);
}

function createReader(inputString) {
  let currentLine = 0;
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());

  return function readLine() {
    return inputString[currentLine++];
  };
}

function parseQueries(readLine, t) {
  const queries = [];

  for (let tItr = 0; tItr < t; tItr++) {
    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    queries.push([n, m]);
  }

  return queries;
}

function parseNumbers(readLine, t) {
  const numbers = [];

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine(), 10);

    numbers.push(n);
  }

  return numbers;
}
