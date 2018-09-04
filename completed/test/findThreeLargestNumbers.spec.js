const { expect } = require('chai');
const {
  MaxList,
  findThreeLargestNumbers,
} = require('../findThreeLargestNumbers');

describe('MaxList', () => {
  beforeEach(() => {});
  describe('getMin', () => {
    it('gets the minimum correctly', () => {
      const maxList = setUpMaxList();
      expect(maxList.getMin()).to.equal(1);
    });
  });
  describe('compare', () => {
    it('should reject something lower than minimum', () => {
      const maxList = setUpMaxList();
      expect(maxList.compare(0)).to.be.false;
    });
    it('should reject something equal to minimum', () => {
      const maxList = setUpMaxList();
      expect(maxList.compare(1)).to.be.false;
    });
    it('should accept something higher than minimum', () => {
      const maxList = setUpMaxList();
      expect(maxList.compare(4)).to.true;
    });
  });
  describe('tryToAdd', () => {
    it('should add a number bigger than the list', () => {
      const maxList = setUpMaxList();
      maxList.tryToAdd(5);
      expect(maxList.list).to.include(5);
    });
    it('should not add a number smaller than the list', () => {
      const maxList = setUpMaxList();
      maxList.tryToAdd(0);
      expect(maxList.list).to.not.include(0);
    });
    it('should maintain Order', () => {
      const maxList = setUpMaxList();
      maxList.tryToAdd(5);
      expect(maxList.list).to.deep.equal([2, 3, 5]);
    });
  });
  describe('should initialize a list from empty', () => {
    it('should add a number', () => {
      const maxList = new MaxList(3);
      maxList.tryToAdd(1);
      expect(maxList.list).to.deep.equal([-Infinity, -Infinity, 1]);
    });
  });
  afterEach(() => {});
});

function setUpMaxList() {
  const list = new MaxList(3);
  list.list = [1, 2, 3];
  return list;
}

describe('findThreeLargestNumbers', () => {
  it('works on an array of size 10', () => {
    const input = [15, 3, 22, 9, 16, 31, 9, 26, 5, 10];
    const expectedOutput = [22, 26, 31];
    expect(findThreeLargestNumbers(input)).to.deep.equal(expectedOutput);
  });
});

function setUpInput() {
  return [15, 3, 22, 9, 16, 31, 9, 26, 5, 10];
}
