const { expect } = require('chai');
const { largestRectangle } = require('../largestRectangle');

function createAssertFunction(func) {
  return (input, expectedOutput) => {
    expect(func(...input)).to.equal(expectedOutput);
  };
}

const assertLargestRectangle = createAssertFunction(largestRectangle);

describe.only('largestRectangle', () => {
  beforeEach(() => {});
  it('given [] returns 0', () => {
    assertLargestRectangle([[]], 0);
  });
  it('given [2] returns 2', () => {
    assertLargestRectangle([[2]], 2);
  });
  it('given [2,5] returns 5', () => {
    assertLargestRectangle([[2, 5]], 5);
  });
  it('given [2,3] returns 4', () => {
    assertLargestRectangle([[2, 3]], 4);
  });
  it('given [5,2] returns 5', () => {
    assertLargestRectangle([[5, 2]], 5);
  });
  it('given [3,2,1] returns 4', () => {
    assertLargestRectangle([[3, 2, 1]], 4);
  });
  it('given [1,2,3] returns 4', () => {
    assertLargestRectangle([[1, 2, 3]], 4);
  });
  it('given [1,2,3,2,1] returns 6', () => {
    assertLargestRectangle([[1, 2, 3, 2, 1]], 6);
  });
  it('given [7,6,5,2,8,3] returns 15', () => {
    assertLargestRectangle([[7, 6, 5, 2, 8, 3]], 15);
  });
  it('given [7,6,5,2,8,3,4,5,6] returns 18', () => {
    assertLargestRectangle([[7, 6, 5, 2, 8, 3, 4, 5, 6]], 18);
  });
  it('given [1,2,3,4,5] returns 9', () => {
    assertLargestRectangle([[1, 2, 3, 4, 5]], 9);
  });
  afterEach(() => {});
});
