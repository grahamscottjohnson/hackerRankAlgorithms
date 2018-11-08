const { expect } = require('chai');
const { longestCommonSubsequence } = require('../longestCommonSubsequence');

describe('longestCommonSubsequence', () => {
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
});
