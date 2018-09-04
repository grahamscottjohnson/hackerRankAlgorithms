const { expect } = require('chai');
const { numberOfBinaryTreeTopologies } = require('../binaryTreeTopologies');
const sinon = require('sinon');

describe('numberOfBinaryTreeTopologies', () => {
  describe('should handle small cases', () => {
    beforeEach(() => {});
    it('returns 0 for 0', () => {
      expect(numberOfBinaryTreeTopologies(0)).to.equal(1);
    });
    it('returns 1 for 1', () => {
      expect(numberOfBinaryTreeTopologies(1)).to.equal(1);
    });
    it('returns 2 for 2', () => {
      expect(numberOfBinaryTreeTopologies(2)).to.equal(2);
    });
    it('returns 5 for 3', () => {
      expect(numberOfBinaryTreeTopologies(3)).to.equal(5);
    });
    it('returns 14 for 4', () => {
      expect(numberOfBinaryTreeTopologies(4)).to.equal(14);
    });
    afterEach(() => {});
  });
  describe('should look into a cache for previous answers', () => {
    beforeEach(() => {});
    it('when given a cache with that value, it returns that value', () => {
      const cache = setUpGetCache();
      expect(numberOfBinaryTreeTopologies(4.5, cache)).to.equal(cache.get(4.5));
    });
    it('sets a new result into the cache', () => {
      const cache = setUpSetCache();
      //   const setSpy = sinon.spy(cache, 'set');
      numberOfBinaryTreeTopologies(3, cache);
      //   expect(setSpy.calledWith()).to.equal(cache.get(4.5));
      expect(cache.get(3)).to.equal(5);
    });
    afterEach(() => {});
  });
});

function setUpGetCache() {
  const cache = new Map();
  cache.set(4.5, 4.5);
  return cache;
}

function setUpSetCache() {
  const cache = new Map();
  cache.set(1, 1);
  cache.set(2, 2);
  return cache;
}
