function componentsInGraph(edges) {
  const graph = createGraphFromEdges(edges);
  return getGraphComponentMinMaxCounts(graph);
}
exports.componentsInGraph = componentsInGraph;

function createGraphFromEdges(edges) {
  const graph = new Map();
  edges.forEach(edge => {
    addEdgeToGraph(edge, graph);
  });
  return graph;
}
exports.createGraphFromEdges = createGraphFromEdges;

function addEdgeToGraph(edge, graph) {
  const [val1, val2] = edge;
  insertIntoGraph(graph, val1, val2);
  insertIntoGraph(graph, val2, val1);
}

function insertIntoGraph(graph, key, val) {
  if (graph.has(key)) {
    const neighbors = graph.get(key);
    neighbors.add(val);
  } else {
    graph.set(key, new Set([val]));
  }
}

function getGraphComponentCountAt(graph, node, visited = new Set()) {
  if (!visited.has(node)) {
    visited.add(node);
    const neighbors = Array.from(graph.get(node));
    return neighbors.reduce((count, neighbor) => {
      return count + getGraphComponentCountAt(graph, neighbor, visited);
    }, 1);
  }
  return 0;
}
exports.getGraphComponentCountAt = getGraphComponentCountAt;

function getGraphComponentMinMaxCounts(graph) {
  if (graph.size === 0) return [0, 0];
  const visited = new Set();
  const counts = new Set();
  graph.forEach((value, key) => {
    if (!visited.has(key)) {
      counts.add(getGraphComponentCountAt(graph, key, visited));
    }
  });
  return [Math.min(...counts), Math.max(...counts)];
}
exports.getGraphComponentMinMaxCounts = getGraphComponentMinMaxCounts;
