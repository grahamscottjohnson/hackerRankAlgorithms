const { expect } = require('chai');
const {
  hasFoundNumberOfJumps,
  updateWithThisJump,
  minNumberOfJumps,
} = require('../minNumberOfJumps');

describe(`algorithm`, () => {
  describe(`hasFoundNumberOfJumps`, () => {
    it('returns true if the search is over', () => {
      const minJumps = [0, 1, 1, 1];
      minJumps.targetIndex = 3;
      expect(hasFoundNumberOfJumps(minJumps)).to.be.true;
    });
    it('returns false if the search is not over', () => {
      const minJumps = [0, 1];
      minJumps.targetIndex = 3;
      expect(hasFoundNumberOfJumps(minJumps)).to.be.false;
    });
  });
  describe(`updateWithThisJump`, () => {
    it('updates the first jump properly', () => {
      const jumpOptions = [2, 1, 3, 1];
      const initialMinJumps = [0];
      initialMinJumps.targetIndex = 3;
      const expectedMinJumps = [0, 1, 1];
      expectedMinJumps.targetIndex = 3;
      expect(updateWithThisJump(jumpOptions, 0, initialMinJumps)).to.deep.equal(
        expectedMinJumps
      );
    });
    it('updates the next jump properly', () => {
      const jumpOptions = [2, 1, 3, 1];
      const initialMinJumps = [0, 1, 1];
      initialMinJumps.targetIndex = 3;
      const expectedMinJumps = [0, 1, 1];
      expectedMinJumps.targetIndex = 3;
      expect(updateWithThisJump(jumpOptions, 1, initialMinJumps)).to.deep.equal(
        expectedMinJumps
      );
    });
  });
  describe(`minNumberOfJumps`, () => {
    it('integrates to solve the problem', () => {
      const jumpOptions = [2, 1, 3, 1];
      const expectedMinNumberOfJumps = 2;
      expect(minNumberOfJumps(jumpOptions)).to.equal(expectedMinNumberOfJumps);
    });
    it('handles edge case', () => {
      const jumpOptions = [10];
      const expectedMinNumberOfJumps = 0;
      expect(minNumberOfJumps(jumpOptions)).to.equal(expectedMinNumberOfJumps);
    });
    it('handles testcase 7', () => {
      const jumpOptions = [2, 1, 2, 3, 1, 1, 1];
      const expectedMinNumberOfJumps = 3;
      expect(minNumberOfJumps(jumpOptions)).to.equal(expectedMinNumberOfJumps);
    });
  });
});
