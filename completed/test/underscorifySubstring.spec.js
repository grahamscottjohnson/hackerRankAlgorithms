const { expect } = require('chai');
const {
  underscorifySubstring,
  makeRangesOfSubstring,
  makeMergedRangesOfSubstring,
  insertUnderscoreIntoStringAt,
} = require('../underscorifySubstring');

xdescribe('underscorifySubstring', () => {
  describe('works for simple cases', () => {
    beforeEach(() => {});
    it('returns _foo_tball for football, foo', () => {
      expect(underscorifySubstring('football', 'foo')).to.equal('_foo_tball');
    });
    it('returns hey, _foo_tball _foo_d for hey, football food, foo', () => {
      expect(underscorifySubstring('hey, football food', 'foo')).to.equal(
        'hey, _foo_tball _foo_d'
      );
    });
    afterEach(() => {});
  });
  describe('works for complicated cases', () => {
    beforeEach(() => {});
    it('returns _foofoofoo_ for foofoofoo, foo', () => {
      expect(underscorifySubstring('foofoofoo', 'foo')).to.equal('_foofoofoo_');
    });
    it('returns _b_o_bb_y for bobby, b', () => {
      expect(underscorifySubstring('bobby', 'b')).to.equal('_b_o_bb_y');
    });
    afterEach(() => {});
  });
});
describe('insertUnderscoreIntoStringAt', () => {
  describe('works for small cases', () => {
    beforeEach(() => {});
    it('returns _foo_tball for football, [0,3]', () => {
      expect(insertUnderscoreIntoStringAt('football', [0, 3])).to.equal(
        '_foo_tball'
      );
    });
    afterEach(() => {});
  });
});
describe('makeRangesOfSubstring', () => {
  beforeEach(() => {});
  it('returns [] if no substring matches', () => {
    expect(makeRangesOfSubstring('football', 'tennis')).to.deep.equal([]);
  });
  it('returns [] if string is empty', () => {
    expect(makeRangesOfSubstring('', 'tennis')).to.deep.equal([]);
  });
  it("returns [] if substring is empty because you're dumb", () => {
    expect(makeRangesOfSubstring('football', '')).to.deep.equal([]);
  });
  it('returns [[0,3]] for football, foo', () => {
    expect(makeRangesOfSubstring('football', 'foo')).to.deep.equal([[0, 3]]);
  });
  it('returns [[5,8], [14,17]] for hey, football food, foo', () => {
    expect(makeRangesOfSubstring('hey, football food', 'foo')).to.deep.equal([
      [5, 8],
      [14, 17],
    ]);
  });
  it('returns [[0,1], [2,3], [3,4]] for bobby, b', () => {
    expect(makeRangesOfSubstring('bobby', 'b')).to.deep.equal([
      [0, 1],
      [2, 3],
      [3, 4],
    ]);
  });
  it('returns [0, 4], [3, 7] for foofoofoo, foof', () => {
    expect(makeRangesOfSubstring('foofoofoo', 'foof')).to.deep.equal([
      [0, 4],
      [3, 7],
    ]);
  });
  afterEach(() => {});
});
describe('makeMergedRangesOfSubstring', () => {
  beforeEach(() => {});
  it('returns [] if no substring matches', () => {
    expect(makeMergedRangesOfSubstring('football', 'tennis')).to.deep.equal([]);
  });
  it('returns [] if string is empty', () => {
    expect(makeMergedRangesOfSubstring('', 'tennis')).to.deep.equal([]);
  });
  it("returns [] if substring is empty because you're dumb", () => {
    expect(makeMergedRangesOfSubstring('football', '')).to.deep.equal([]);
  });
  it('returns [[0,3]] for football, foo', () => {
    expect(makeMergedRangesOfSubstring('football', 'foo')).to.deep.equal([
      [0, 3],
    ]);
  });
  it('returns [[5,8], [14,17]] for hey, football food, foo', () => {
    expect(
      makeMergedRangesOfSubstring('hey, football food', 'foo')
    ).to.deep.equal([[5, 8], [14, 17]]);
  });
  it('returns [[0,1], [2,4]] for bobby, b', () => {
    expect(makeMergedRangesOfSubstring('bobby', 'b')).to.deep.equal([
      [0, 1],
      [2, 4],
    ]);
  });
  it('returns [[0,1], [2,4]] for bobby, b', () => {
    expect(makeMergedRangesOfSubstring('bobby', 'b')).to.deep.equal([
      [0, 1],
      [2, 4],
    ]);
  });
  it('returns [0,9] for foofoofoo, foof', () => {
    expect(makeMergedRangesOfSubstring('foofoofoo', 'foof')).to.deep.equal([
      [0, 7],
    ]);
  });
  afterEach(() => {});
});
