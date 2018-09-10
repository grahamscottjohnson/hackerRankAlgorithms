const { expect } = require('chai');
const { maxSubsetSumNoAdjacent } = require('../maxSumNoAdjacent');

describe.only('maxSumNoAdjacent', () => {
  beforeEach(() => {});
  it('returns 0 for an empty array', () => {
    expect(maxSubsetSumNoAdjacent([])).to.equal(0);
  });
  it('returns 1 for an [1]', () => {
    expect(maxSubsetSumNoAdjacent([1])).to.equal(1);
  });
  it('returns 2 for an [2,1]', () => {
    expect(maxSubsetSumNoAdjacent([2, 1])).to.equal(2);
  });
  it('returns 2 for an [1,2]', () => {
    expect(maxSubsetSumNoAdjacent([1, 2])).to.equal(2);
  });
  it('returns 10 for an [1,5,1,5]', () => {
    expect(maxSubsetSumNoAdjacent([1, 5, 1, 5])).to.equal(10);
  });
  it('returns 6 for an [1,5,5,1]', () => {
    expect(maxSubsetSumNoAdjacent([1, 5, 5, 1])).to.equal(6);
  });
  it('returns 10 for an [2,5,5,1,3]', () => {
    expect(maxSubsetSumNoAdjacent([2, 5, 5, 1, 3])).to.equal(10);
  });
  it('returns 33 for an [7,10,12,7,9,14]', () => {
    expect(maxSubsetSumNoAdjacent([7, 10, 12, 7, 9, 14])).to.equal(33);
  });
  afterEach(() => {});
});
