const { expect } = require('chai');

function createAssertFunction(func) {
  return (input, expectedOutput) => {
    expect(func(...input)).to.equal(expectedOutput);
  };
}

xdescribe('', () => {
  beforeEach(() => {});
  it('', () => {});
  afterEach(() => {});
});
