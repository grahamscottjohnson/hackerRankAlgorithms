const { expect } = require('chai');
const { smallestDifference } = require('../smallestDifference');

describe.only('smallestDifference', () => {
  beforeEach(() => {});
  it('returns [] for two empty arrays', () => {
    expect(smallestDifference([], [])).to.deep.equal([]);
  });
  it('returns [] for one empty arrays', () => {
    expect(smallestDifference([1], [])).to.deep.equal([]);
  });
  it('returns [1,2] for arrays [1], [2]', () => {
    expect(smallestDifference([1], [2])).to.deep.equal([1, 2]);
  });
  it('returns [6,7] for arrays [1,2,3,4,5,6,], [7,8,9,10,11]', () => {
    expect(
      smallestDifference([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11])
    ).to.deep.equal([6, 7]);
  });
  afterEach(() => {});
});
