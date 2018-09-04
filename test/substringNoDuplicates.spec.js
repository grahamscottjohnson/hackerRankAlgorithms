const { expect } = require('chai');
const {
  longestSubstringWithoutDuplication,
  Substring,
} = require('../substringNoDuplicates');

describe('longestSubstringWithoutDuplication', () => {
  describe('works for small cases', () => {
    beforeEach(() => {});
    it('works on empty string', () => {
      expect(longestSubstringWithoutDuplication('')).to.equal('');
    });
    it('works on singleton string', () => {
      expect(longestSubstringWithoutDuplication('a')).to.equal('a');
    });
    it('returns ab for abab', () => {
      expect(longestSubstringWithoutDuplication('abab')).to.equal('ab');
    });
    it('returns bings for cabobbings', () => {
      expect(longestSubstringWithoutDuplication('cabobbings')).to.equal(
        'bings'
      );
    });
    it('returns bing for bobbingbus', () => {
      expect(longestSubstringWithoutDuplication('bobbingbus')).to.equal('bing');
    });
    afterEach(() => {});
  });
});
describe('Substring', () => {
  let substring;
  beforeEach(() => {
    substring = new Substring('happy');
  });
  describe('value', () => {
    beforeEach(() => {});
    it('works normally', () => {
      expect(substring.value).to.equal('');
    });
    afterEach(() => {});
  });
  describe('increaseEnd', () => {
    beforeEach(() => {});
    it('works normally', () => {
      substring.increaseEnd();
      expect(substring.value).to.equal('h');
    });
    it('handles being at the end', () => {
      substring.end = 5;
      substring.increaseEnd();
      expect(substring.value).to.equal('happy');
      expect(substring.end).to.equal(5);
    });
    it('updates the letters with that letter', () => {
      substring.end = 1;
      substring.letters = { h: { letter: 'h', index: 0 } };
      substring.increaseEnd();
      expect(substring.letters).to.deep.equal({
        h: { letter: 'h', index: 0 },
        a: { letter: 'a', index: 1 },
      });
    });
    afterEach(() => {});
  });
  describe('removeStart', () => {
    beforeEach(() => {});
    it('works normally', () => {
      substring.end = 2;
      substring.letters = {
        h: { letter: 'h', index: 0 },
        a: { letter: 'a', index: 1 },
      };
      substring.removeStart(0);
      expect(substring.value).to.equal('a');
      expect(substring.start).to.equal(1);
      expect(substring.letters).to.deep.equal({ a: { letter: 'a', index: 1 } });
    });
    afterEach(() => {});
  });
});
