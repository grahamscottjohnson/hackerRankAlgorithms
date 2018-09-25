const { expect } = require('chai');
const { diskStacking, Disk } = require('../diskStacking');

describe.only('diskStacking', () => {
  beforeEach(() => {});
  it('works for a single disk', () => {
    const inputDisks = [[1, 0, 0]];
    const expectedDisks = [[1, 0, 0]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  it('works for two unsorted disks one variable', () => {
    const inputDisks = [[2, 1, 1], [1, 0, 0]];
    const expectedDisks = [[1, 0, 0], [2, 1, 1]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  it('works for three disks one variable', () => {
    const inputDisks = [[2, 1, 1], [3, 2, 2], [1, 0, 0]];
    const expectedDisks = [[1, 0, 0], [2, 1, 1], [3, 2, 2]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  it('works for three disks one variable of equal size', () => {
    const inputDisks = [[2, 0, 0], [2, 0, 0], [2, 0, 0]];
    const expectedDisks = [[2, 0, 0]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  it('works for four disks of random dimensions', () => {
    const inputDisks = [[2, 7, 3], [5, 5, 1], [6, 11, 115], [3, 10, 12]];
    const expectedDisks = [[2, 7, 3], [3, 10, 12], [6, 11, 115]];
    expect(diskStacking(inputDisks)).to.deep.equal(expectedDisks);
  });
  afterEach(() => {});
});

describe('Disk', () => {
  describe('sumOfDimensions', () => {
    beforeEach(() => {});
    it('returns 2 for [1,1,0]', () => {
      const inputDisk = new Disk([1, 1, 0]);
      const expectedValue = 2;
      expect(inputDisk.sumOfDimensions).to.deep.equal(expectedValue);
    });
    // it('returns -.5 for [0,-1,-1]', () => {
    //   const inputDisk = new Disk([0, -1, -1]);
    //   const expectedValue = -0.5;
    //   expect(inputDisk.projectedUnitValue).to.deep.equal(expectedValue);
    // });
    afterEach(() => {});
  });
  describe('magnitude', () => {
    beforeEach(() => {});
    it('returns root2 for [1,1,0]', () => {
      const inputDisk = new Disk([1, 1, 0]);
      const expectedValue = Math.sqrt(2);
      expect(inputDisk.magnitude).to.deep.equal(expectedValue);
    });
    // it('returns -.5 for [0,-1,-1]', () => {
    //   const inputDisk = new Disk([0, -1, -1]);
    //   const expectedValue = -0.5;
    //   expect(inputDisk.projectedUnitValue).to.deep.equal(expectedValue);
    // });
    afterEach(() => {});
  });
  describe('distanceFromIdentity', () => {
    beforeEach(() => {});
    xit('returns root3 / 2 for [1,1,0]', () => {
      const inputDisk = new Disk([1, 1, 0]);
      const expectedValue = Math.sqrt(3) / 2;
      expect(inputDisk.distanceFromIdentity).to.deep.equal(expectedValue);
    });
    // it('returns -.5 for [0,-1,-1]', () => {
    //   const inputDisk = new Disk([0, -1, -1]);
    //   const expectedValue = -0.5;
    //   expect(inputDisk.projectedUnitValue).to.deep.equal(expectedValue);
    // });
    afterEach(() => {});
  });
});
