const { expect } = require('chai');
const { gameOfThrones } = require('../gameOfThrone');

describe('gameOfThrones', () => {
  beforeEach(() => {});
  it('returns true for a', () => {
    expect(gameOfThrones('')).to.be.true;
  });
  it('returns true for a', () => {
    expect(gameOfThrones('a')).to.be.true;
  });
  it('returns true for aabb', () => {
    expect(gameOfThrones('aabb')).to.be.true;
  });
  it('returns true for caabb', () => {
    expect(gameOfThrones('caabb')).to.be.true;
  });
  it('returns false for cadabb', () => {
    expect(gameOfThrones('cadabb')).to.be.false;
  });
  afterEach(() => {});
});
