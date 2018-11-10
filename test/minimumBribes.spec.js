const { expect } = require('chai');
const { minimumBribes } = require('../minimumBribes');

function createAssertFunction(func) {
  return (input, expectedOutput) => {
    expect(func(...input)).to.equal(expectedOutput);
  };
}

const assertMinimumBribes = createAssertFunction(minimumBribes);

const testAssert = function(input, expectedOutput) {
  it(`given ${input} returns ${expectedOutput}`, () => {
    assertMinimumBribes(input, expectedOutput);
  });
};

describe.only('minimumBribes', () => {
  beforeEach(() => {});
  it('given [1] returns 0', () => {
    assertMinimumBribes([[1]], 0);
  });
  it('given [2,1] returns 1', () => {
    assertMinimumBribes([[2, 1]], 1);
  });
  it('given [1,2,3] returns 0', () => {
    assertMinimumBribes([[1, 2, 3]], 0);
  });
  it('given [1,3,2] returns 1', () => {
    assertMinimumBribes([[1, 3, 2]], 1);
  });
  it('given [3,1,2] returns 2', () => {
    assertMinimumBribes([[3, 1, 2]], 2);
  });
  it('given [3,2,1] returns 3', () => {
    assertMinimumBribes([[3, 2, 1]], 3);
  });
  it('given [2,1,4,3] returns 2', () => {
    assertMinimumBribes([[2, 1, 4, 3]], 2);
  });
  it('given [2,3,4,1] returns 3', () => {
    assertMinimumBribes([[2, 3, 4, 1]], 3);
  });
  it('given [1,4,3,2] returns 3', () => {
    assertMinimumBribes([[1, 4, 3, 2]], 3);
  });
  it('given [3,4,1,2] returns 4', () => {
    assertMinimumBribes([[3, 4, 1, 2]], 4);
  });
  it('given [3,4,2,1] returns 5', () => {
    assertMinimumBribes([[3, 4, 2, 1]], 5);
  });
  it('given [4,3,2,1] returns "Too chaotic"', () => {
    assertMinimumBribes([[4, 3, 2, 1]], 'Too chaotic');
  });

  testAssert([[2, 3, 5, 1, 4]], 4);

  testAssert([[2, 3, 5, 4, 1]], 5);

  testAssert([[3, 2, 1, 6, 5, 4]], 6);

  testAssert([[3, 4, 1, 5, 6, 2]], 6);

  testAssert([[1, 2, 5, 3, 7, 8, 6, 4]], 7);

  afterEach(() => {});
});
