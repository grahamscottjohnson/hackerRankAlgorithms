const { expect } = require('chai');
const {
  componentsInGraph,
  createGraphFromEdges,
  getGraphComponentCountAt,
  getGraphComponentMinMaxCounts,
} = require('../graphComponents');

describe.only('graphComponents.js', () => {
  beforeEach(() => {});
  describe('createGraphFromEdges', () => {
    beforeEach(() => {});
    it('turns [] into empty Map', () => {
      const edges = [];
      const output = createGraphFromEdges(edges);
      const expectedOutput = new Map();
      expect(output).to.deep.equal(expectedOutput);
    });
    it('turns [[1, 6]] into Map 1:6, 6:1', () => {
      const edges = [[1, 6]];
      const output = createGraphFromEdges(edges);
      const expectedOutput = new Map();
      expectedOutput.set(1, new Set([6]));
      expectedOutput.set(6, new Set([1]));
      expect(output).to.deep.equal(expectedOutput);
    });
    it('turns [[1, 6], [1, 7]] into Map 1: 6,7, 6:1, 7:1', () => {
      const edges = [[1, 6], [1, 7]];
      const output = createGraphFromEdges(edges);
      const expectedOutput = new Map();
      expectedOutput.set(1, new Set([6, 7]));
      expectedOutput.set(6, new Set([1]));
      expectedOutput.set(7, new Set([1]));
      expect(output).to.deep.equal(expectedOutput);
    });
    afterEach(() => {});
  });
  describe('componentsInGraph', () => {
    beforeEach(() => {});
    it('turns [] into [0,0]', () => {
      const edges = [];
      const output = componentsInGraph(edges);
      const expectedOutput = [0, 0];
      expect(output).to.deep.equal(expectedOutput);
    });
    it('turns [[1,6]] into [1,1]', () => {
      const edges = [[1, 6]];
      const output = componentsInGraph(edges);
      const expectedOutput = [2, 2];
      expect(output).to.deep.equal(expectedOutput);
    });
    it('works for HackerRank Testcase 33', () => {
      const edges = [[1, 6]];
      const output = componentsInGraph(edges);
      const expectedOutput = [2, 2];
      expect(output).to.deep.equal(expectedOutput);
    });
    afterEach(() => {});
  });
  describe('getGraphComponentCountAt', () => {
    let graph;
    beforeEach(() => {
      graph = initializeTestGraph();
    });
    it('turns testGraph at 0 into 0', () => {
      const output = getGraphComponentCountAt(graph, 1);
      const expectedOutput = 4;
      expect(output).to.deep.equal(expectedOutput);
    });
    it('turns testGraph at 1 into 4', () => {
      const output = getGraphComponentCountAt(graph, 1);
      const expectedOutput = 4;
      expect(output).to.deep.equal(expectedOutput);
    });
    it('turns testGraph at 3 into 2', () => {
      const output = getGraphComponentCountAt(graph, 1);
      const expectedOutput = 4;
      expect(output).to.deep.equal(expectedOutput);
    });
    afterEach(() => {});
  });
  describe('getGraphComponentMinMaxCounts', () => {
    let graph;
    beforeEach(() => {
      graph = initializeTestGraph();
    });
    it('turns testGraph at 0 into 0', () => {
      const output = getGraphComponentMinMaxCounts(graph);
      const expectedOutput = [2, 4];
      expect(output).to.deep.equal(expectedOutput);
    });
    afterEach(() => {});
  });
  afterEach(() => {});
});

function initializeTestGraph() {
  const graph = new Map();
  graph.set(1, new Set([6, 7]));
  graph.set(2, new Set([6]));
  graph.set(3, new Set([8]));
  graph.set(6, new Set([1, 2]));
  graph.set(7, new Set([1]));
  graph.set(8, new Set([3]));
  return graph;
}
