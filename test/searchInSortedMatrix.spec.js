const { expect } = require('chai');
const { searchInSortedMatrix } = require('../searchInSortedMatrix');

describe.only('searchInSortedMatrix', () => {
  beforeEach(() => {});
  it('returns [-1,-1] for an empty matrix', () => {
    expect(searchInSortedMatrix([[]], 0)).to.deep.equal([-1, -1]);
  });
  it('returns [0,0] for a 1x1 matrix', () => {
    expect(searchInSortedMatrix([[0]], 0)).to.deep.equal([0, 0]);
  });
  it('returns [-1,-1] for a 1x1 matrix with bad target', () => {
    expect(searchInSortedMatrix([[5]], 0)).to.deep.equal([-1, -1]);
  });
  it('returns [1,1] for a 2x2 matrix', () => {
    const row1 = [1, 2];
    const row2 = [2, 3];
    const matrix = [row1, row2];
    expect(searchInSortedMatrix(matrix, 3)).to.deep.equal([1, 1]);
  });
  //what to do if there are two targets in matrix?
  afterEach(() => {});
});
