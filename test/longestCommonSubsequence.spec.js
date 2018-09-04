const { expect } = require('chai');
const {
  longestCommonSubsequence,
  findMatchedSubsequence,
} = require('../longestCommonSubsequence');

xdescribe('longestCommonSubsequence', () => {
  describe('works for small cases', () => {
    beforeEach(() => {});
    it('returns [] if given an empty string', () => {
      expect(longestCommonSubsequence('t', '')).to.deep.equal([]);
      expect(longestCommonSubsequence('', 't')).to.deep.equal([]);
      expect(longestCommonSubsequence('', '')).to.deep.equal([]);
    });
    it('returns [] if no match', () => {
      expect(longestCommonSubsequence('s', 't')).to.deep.equal([]);
    });
    it('return ["L"] if given LCS and ALL', () => {
      expect(longestCommonSubsequence('LCS', 'ALL')).to.deep.equal(['L']);
    });
    afterEach(() => {});
  });
  describe('works for big cases', () => {
    beforeEach(() => {});
    it('returns [asl] if given Haskell and Pascal', () => {
      expect(longestCommonSubsequence('HASKELL', 'PASCAL')).to.deep.equal([
        'A',
        'S',
        'L',
      ]);
    });
    afterEach(() => {});
  });
  describe('findMatchedSubsequence', () => {
    beforeEach(() => {});
    it('returns [] for no matching first letter', () => {
      expect(findMatchedSubsequence('BOGOO', 'DO')).to.deep.equal([]);
    });
    it('returns ["B", "O"] for BOGOO and HOOBO', () => {
      expect(findMatchedSubsequence('BOGOO', 'HOOBO')).to.deep.equal([
        'B',
        'O',
      ]);
    });
    afterEach(() => {});
  });
});
