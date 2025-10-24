import System from "./System";

/**
 * Determine the shortest path between two Planetary Systems and return the next system
 *
 * @param system      A star system from which to calculate the shortest path to destination
 * @param destination A star system which is the final location
 *
 * Return             The next system which would lead the shortest path to the destination
 */
export const calculateShortest = (
  system: System,
  destination: System,
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
    nextStop: optimalPath[0],
  };

  return results;
};
