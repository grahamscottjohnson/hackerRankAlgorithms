const { expect } = require('chai');
const { cost } = require('../sherlockAndCost');

describe.only('cost', () => {
  beforeEach(() => {});
  it('returns 0 for [1]', () => {
    expect(cost([1])).to.equal(0);
  });
  it('returns 1 for [1,2]', () => {
    expect(cost([1, 2])).to.equal(1);
  });
  it('returns 2 for [1,2,3]', () => {
    expect(cost([1, 2, 3])).to.equal(2);
  });
  it('returns 203 for [100, 99, 10, 7]', () => {
    expect(cost([100, 99, 10, 7])).to.equal(202);
  });
  it('returns 299 for [100, 99, 98, 10, 7]', () => {
    expect(cost([100, 99, 98, 10, 7])).to.equal(299);
  });
  it('returns 99 for [100, 40, 1]', () => {
    expect(cost([100, 40, 1])).to.equal(99);
  });
  it('returns 118 for [100, 60, 1]', () => {
    expect(cost([100, 60, 1])).to.equal(118);
  });
  it('returns 148 for [50, 41, 48, 69]', () => {
    expect(cost([50, 41, 48, 69])).to.equal(148);
  });
  it('returns 1638 for [50, 41, 48, 69, 35, 11, 36, 38, 73, 34, 26, 13, 39, 94, 7, 13, 92, 54, 55, 86, 14, 90, 76, 78, 36, 70, 93, 76, 16]', () => {
    expect(
      cost([
        50,
        41,
        48,
        69,
        35,
        11,
        36,
        38,
        73,
        34,
        26,
        13,
        39,
        94,
        7,
        13,
        92,
        54,
        55,
        86,
        14,
        90,
        76,
        78,
        36,
        70,
        93,
        76,
        16,
      ])
    ).to.equal(1638);
  });
  afterEach(() => {});
});
//[0,99,196, 203]
//[0,98,108]
