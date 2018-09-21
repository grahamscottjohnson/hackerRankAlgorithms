const { expect } = require('chai');
const { diskStacking } = require('../diskStacking');

describe.only('diskStacking', () => {
  beforeEach(() => {});
  it('works for a single disk', () => {
    const inputDisks = [[1, 0, 0]];
    const expectedDisks = [[1, 0, 0]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  it('works for two unsorted disks one variable', () => {
    const inputDisks = [[2, 0, 0], [1, 0, 0]];
    const expectedDisks = [[1, 0, 0], [2, 0, 0]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  it('works for three disks one variable', () => {
    const inputDisks = [[2, 0, 0], [3, 0, 0], [1, 0, 0]];
    const expectedDisks = [[1, 0, 0], [2, 0, 0], [3, 0, 0]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  it('works for three disks one variable of equal size', () => {
    const inputDisks = [[2, 0, 0], [2, 0, 0], [2, 0, 0]];
    const expectedDisks = [[2, 0, 0]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  afterEach(() => {});
});
