const { expect } = require('chai');
const { LegoBlocks } = require('../legoBlocks');
const { readFromFile } = require('./reading');
const bigInt = require('big-integer');

xdescribe('legoBlocks', () => {
  beforeEach(() => {});

  function assertSolve(input, expectedOutput) {
    const output = new LegoBlocks().solve(...input);
    expect(output).to.equal(expectedOutput);
  }

  describe('solve', () => {
    beforeEach(() => {});
    it('returns 0 for [0, 2]', () => {
      assertSolve([0, 2], 0);
    });
    it('returns 0 for [2, 0]', () => {
      assertSolve([2, 0], 0);
    });
    it('returns 1 for [1, 1]', () => {
      assertSolve([1, 1], 1);
    });
    it('returns 1 for [2, 1]', () => {
      assertSolve([2, 1], 1);
    });
    it('returns 1 for [1, 2]', () => {
      assertSolve([1, 2], 1);
    });
    it('returns 3 for [2, 2]', () => {
      assertSolve([2, 2], 3);
    });
    it('returns 7 for [3, 2]', () => {
      assertSolve([3, 2], 7);
    });
    it('returns 9 for [2, 3]', () => {
      assertSolve([2, 3], 9);
    });
    it('returns 3375 for [4, 4]', () => {
      assertSolve([4, 4], 3375);
    });
    it('solves Input 01 from HackerRank', async () => {
      const queries = parseInput(
        await readFromFile('./testData/legoBlocksInput01.txt')
      );
      const outputs = parseOutput(
        await readFromFile('./testData/legoBlocksOutput01.txt')
      );
      queries.forEach((input, index) => {
        assertSolve(input, outputs[index]);
      });
    });
    xit('solves Input 02 from HackerRank', async () => {
      const queries = parseInput(
        await readFromFile('./testData/legoBlocksInput02.txt')
      );
      const outputs = parseOutput(
        await readFromFile('./testData/legoBlocksOutput02.txt')
      );
      queries.forEach((input, index) => {
        assertSolve(input, outputs[index]);
      });
    });
    afterEach(() => {});
  });

  function assertDivideRowOfSize(input, expectedOutput) {
    const output = new LegoBlocks().divideRowOfSize(input);
    expect(output).to.equal(expectedOutput);
  }

  describe('divideRowOfSize', () => {
    beforeEach(() => {});
    it('returns 1 for for 0', () => {
      assertDivideRowOfSize(0, 1);
    });
    it('returns 1 for for 1', () => {
      assertDivideRowOfSize(1, 1);
    });
    it('returns 2 for for 2', () => {
      assertDivideRowOfSize(2, 2);
    });
    it('returns 4 for for 3', () => {
      assertDivideRowOfSize(3, 4);
    });
    it('returns 8 for for 4', () => {
      assertDivideRowOfSize(4, 8);
    });
    it('returns 15 for for 5', () => {
      assertDivideRowOfSize(5, 15);
    });
    afterEach(() => {});
  });

  function assertCalculateAllTowers(input, expectedOutput) {
    const output = new LegoBlocks().calculateAllTowers(...input);
    expect(output.valueOf()).to.equal(expectedOutput.valueOf());
  }

  describe('caclculateAllTowers', () => {
    beforeEach(() => {});
    it('returns bigInt(8) for for [3, 2]', () => {
      assertCalculateAllTowers([3, 2], bigInt(8));
    });
    afterEach(() => {});
  });

  function assertCalculateBadTowers(input, expectedOutput) {
    const output = new LegoBlocks().calculateBadTowers(...input);
    expect(output.valueOf()).to.equal(expectedOutput.valueOf());
  }

  describe('caclculateBadTowers', () => {
    beforeEach(() => {});
    it('returns 0 for [3, 1]', () => {
      assertCalculateBadTowers([3, 1], bigInt(0));
    });
    it('returns 1 for [3, 2]', () => {
      assertCalculateBadTowers([3, 2], bigInt(1));
    });
    it('returns 7 for [2,3]', () => {
      assertCalculateBadTowers([2, 3], bigInt(7));
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
