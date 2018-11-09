const { expect } = require('chai');
const { maxSubsetSum } = require('../maxArraySum');

function createAssertFunction(func) {
  return (input, expectedOutput) => {
    expect(func(...input)).to.equal(expectedOutput);
  };
}

const assertMaxSubsetSum = createAssertFunction(maxSubsetSum);

describe.only('maxSubsetSum', () => {
  beforeEach(() => {});
  xit('given [] returns 0', () => {
    //0 is awkward
    assertMaxSubsetSum([[]], 0);
  });
  it('given [2] returns 2', () => {
    assertMaxSubsetSum([[2]], 2);
  });
  it('given [2,3] returns 3', () => {
    assertMaxSubsetSum([[2, 3]], 3);
  });
  it('given [3,2] returns 3', () => {
    assertMaxSubsetSum([[3, 2]], 3);
  });
  it('given [2,3,2] returns 4', () => {
    assertMaxSubsetSum([[2, 3, 2]], 4);
  });
  it('given [2,6,2, -3] returns 6', () => {
    assertMaxSubsetSum([[2, 6, 2, -3]], 6);
  });
  it('given [5,4,3,9] returns 14', () => {
    assertMaxSubsetSum([[5, 4, 3, 9]], 14);
  });
  it('given [5,4,6,3,3,9] returns 20', () => {
    assertMaxSubsetSum([[5, 4, 6, 3, 3, 9]], 20);
  });
  afterEach(() => {});
});
