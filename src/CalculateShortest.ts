import System from "./domain/StarSystem";
import { Pathfinder } from "./Pathfinder";

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
  const { costs } = Pathfinder.computeShortestPaths(system);
  const nextRoute = Pathfinder.getNextShortestRoute(system, destination);

  return {
    distance: costs[destination.name].distance,
    nextStop: nextRoute ? nextRoute.destination : system,
  };
};
