import System from "./System";

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

const dijkstra = graph => {
  const costs = Object.assign({ finish: Infinity }, graph.start);
  const parents = { finish: null };
  for (let child in graph.start) {
    // add children of start node
    parents[child] = "start";
  }
  const processed = [];

  let node = lowestCostNode(costs, processed);
  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ["finish"];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }

  optimalPath.reverse(); // reverse array to get correct order
  const results = {
    distance: costs.finish,
    path: optimalPath
  };
  return results;
};

/**
 *
 * @param system      A star system from which to calculate the shortest path to destination
 * @param destination A star system which is the final location
 *
 * Return             The next system which would lead the shortest path to the destination
 */
export const calculateShortest = (
  system: System,
  destination: System
): { distance: number; nextStop: System } => {
  const { costs, parents } = system.createChildrenMapping(destination);

  /**
   * {
   * [name]: [name],
   * [parentName]: [childName]
   * }
   *
   * System.createChildrenMapping
   */

  let optimalPath: Array<System> = [destination];
  let parentName = parents[destination.name];
  while (parentName) {
    optimalPath.push(costs[parentName].system);
    parentName = costs[parents[parentName]]?.system.name;
  }

  optimalPath.reverse(); // reverse array to get correct order
  const results = {
    distance: costs[destination.name].distance,
    nextStop: optimalPath[0]
  };

  return results;
};
