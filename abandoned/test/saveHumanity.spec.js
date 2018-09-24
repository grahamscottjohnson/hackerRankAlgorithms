const { expect } = require('chai');
const { virusIndices } = require('../saveHumanity');

xdescribe('virusIndices', () => {
  beforeEach(() => {});
  it('returns 0  for aba, ab', () => {
    expect(virusIndices('aba', 'ab')).to.equal('0');
  });
  it('returns 0 1 for aaaa, aaa', () => {});
  afterEach(() => {});
});
