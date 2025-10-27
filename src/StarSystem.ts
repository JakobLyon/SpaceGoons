import { Chance } from "chance";
import { SystemRoute } from "./SystemRoute";
import { getRiskRewardChance } from "./RiskReward";
import { Pathfinder } from "./Pathfinder";

/**
 * Represents a star system within a network of connected planetary systems
 *
 * Each system has a generated name, a list of routes to other systems, and an
 * optional distance value to its parent system
 */
export default class StarSystem {
  name: string;
  routes: Array<SystemRoute>;
  distanceToParent: number;
  constructor(generator: Chance.Chance = new Chance()) {
    this.name = generator.name();
    this.routes = [];
    this.distanceToParent = 0;
  }

  /**
   * Generates a list of travel options from this system to connected systems.
   *
   * Each option includes the index, destination system name, distance in lightyears,
   * and the calculated chances of risk and reward for that route.
   *
   * @returns A string where each line represents a travel option in the format:
   *          "{index}: {destination name}, {distance} Lightyears,
   *          Chance of Risk: {risk %}, Chance of Reward: {reward %}"
   */
  travelOptions = (): string =>
    this.routes
      .map((systemRoute, index) => {
        const { riskChance, rewardChance } = getRiskRewardChance(
          systemRoute.distanceType,
        );
        return `${index}: ${systemRoute.destination.name}, ${
          systemRoute.distance
        } Lightyears, Chance of Risk: ${riskChance.toLocaleString("en", {
          style: "percent",
        })}, Chance of Reward: ${rewardChance.toLocaleString("en", {
          style: "percent",
        })}`;
      })
      .join("\n");

  /**
   * Builds a mapping of the shortest paths (costs) and parent systems from this system
   * to the given final destination using a variation of Dijkstra's algorithm.
   *
   * This function recursively updates and returns:
   *  - `costs`: maps each system name to a `SystemNode` containing the system and current shortest distance
   *  - `parents`: maps each system name to its parent system along the shortest path
   *
   * Since the calling context has the finalDestination, they can determine the shortest path given
   * the list of
   *
   * @param finalDestination - The system which is the target destination.
   * @param costs - Optional existing cost mapping, used internally for recursion.
   * @param parents - Optional existing parent mapping, used internally for recursion.
   * @param processed - List of system names that have already been processed to prevent cycles.
   * @returns An object containing updated `costs` and `parents` mappings.
   */
  getNextClosestRoute(destination: StarSystem) {
    return Pathfinder.getNextShortestRoute(this, destination);
  }
}
