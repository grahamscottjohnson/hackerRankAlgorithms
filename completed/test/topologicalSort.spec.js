const { expect } = require('chai');
const { topologicalSort } = require('../topologicalSort');

function createAssertFunction(func) {
  return (input, expectedOutput) => {
    expect(func(...input)).to.deep.equal(expectedOutput);
  };
}

const assertTopologicalSort = createAssertFunction(topologicalSort);

describe.only('topologicalSort', () => {
  beforeEach(() => {});
  it('', () => {
    const jobs = [1, 2, 3];
    const deps = [[3, 1], [2, 3]];
    const expectedOutput = [2, 3, 1];
    assertTopologicalSort([jobs, deps], expectedOutput);
  });
  afterEach(() => {});
});
