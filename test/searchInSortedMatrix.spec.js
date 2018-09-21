const { expect } = require('chai');
const { searchInSortedMatrix } = require('../searchInSortedMatrix');

xdescribe('searchInSortedMatrix', () => {
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
  it('returns [0,1] for a 2x2 matrix', () => {
    const row1 = [1, 3];
    const row2 = [2, 4];
    const matrix = [row1, row2];
    expect(searchInSortedMatrix(matrix, 3)).to.deep.equal([0, 1]);
  });
  it('works for a 3x3 matrix', () => {
    const row1 = [1, 3, 5];
    const row2 = [2, 4, 6];
    const row3 = [7, 8, 9];
    const matrix = [row1, row2, row3];
    expect(searchInSortedMatrix(matrix, 1)).to.deep.equal([0, 0]);
    expect(searchInSortedMatrix(matrix, 4)).to.deep.equal([1, 1]);
    expect(searchInSortedMatrix(matrix, 6)).to.deep.equal([1, 2]);
    expect(searchInSortedMatrix(matrix, 10)).to.deep.equal([-1, -1]);
  });
  it('works for a 3x5 matrix', () => {
    const row1 = [1, 3, 5, 11, 12];
    const row2 = [2, 4, 6, 13, 14];
    const row3 = [7, 8, 9, 15, 16];
    const matrix = [row1, row2, row3];
    expect(searchInSortedMatrix(matrix, 12)).to.deep.equal([0, 4]);
    expect(searchInSortedMatrix(matrix, 8)).to.deep.equal([2, 1]);
    expect(searchInSortedMatrix(matrix, 6)).to.deep.equal([1, 2]);
    expect(searchInSortedMatrix(matrix, 10)).to.deep.equal([-1, -1]);
  });
  //what to do if there are two targets in matrix?
  //return any matching index
  afterEach(() => {});
});
