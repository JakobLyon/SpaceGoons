import { Chance } from "chance";
import { SystemRoute } from "./SystemRoute";
import { getRiskRewardChance } from "./RiskReward";
import { SystemNode } from "./interfaces/SystemNode";

/**
 * Represents a star system within a network of connected planetary systems
 *
 * Each system has a generated name, a list of routes to other systems, and an
 * optional distance value to its parent system
 */
export default class System {
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
   * This function recursively updates:
   *  - `costs`: maps each system name to a `SystemNode` containing the system and current shortest distance
   *  - `parents`: maps each system name to its parent system along the shortest path
   *
   * @param finalDestination - The system which is the target destination.
   * @param costs - Optional existing cost mapping, used internally for recursion.
   * @param parents - Optional existing parent mapping, used internally for recursion.
   * @param processed - List of system names that have already been processed to prevent cycles.
   * @returns An object containing updated `costs` and `parents` mappings.
   */
  createChildrenMapping = (
    finalDestination: System,
    costs: { [systemName: string]: SystemNode } | null = null,
    parents: { [systemName: string]: string | null } | null = null,
    processed: Array<string> = [],
  ): {
    costs: { [systemName: string]: SystemNode };
    parents: { [systemName: string]: string | null };
  } => {
    if (!costs) {
      costs = {
        [finalDestination.name]: {
          system: finalDestination,
          distance: Infinity,
        },
        ...this.routes.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.destination.name]: {
              system: cur.destination,
              distance: cur.distance,
            },
          };
        }, {}),
      };
    }

    if (!parents) {
      parents = { [finalDestination.name]: null };
    }
    this.routes.forEach((route) => {
      parents[route.destination.name] = this.name;
    });

    const nextToProcess: SystemRoute[] = [];
    let node = this.lowestCostNode(costs, processed);
    while (node) {
      let systemNode = costs[node.system.name];
      node.system.routes.forEach((route) => {
        let newCost = systemNode.distance + route.distance;
        if (!costs[route.destination.name]) {
          costs[route.destination.name] = {
            system: route.destination,
            distance: newCost,
          };
          parents[route.destination.name] = node.system.name;
        }
        if (costs[route.destination.name].distance > newCost) {
          costs[route.destination.name] = {
            system: route.destination,
            distance: newCost,
          };
          parents[route.destination.name] = node.system.name;
        }
        nextToProcess.push(...route.destination.routes);
      });
      processed.push(node.system.name);
      node = this.lowestCostNode(costs, processed);
    }

    for (const route of nextToProcess) {
      route.destination.createChildrenMapping(
        finalDestination,
        costs,
        parents,
        processed,
      );
    }

    return { costs, parents };
  };

  /**
   *
   * @param costs     A object of Systems
   * @param processed An array of already processed Systems
   * @returns         The system with the lowest cost to travel to
   */
  private lowestCostNode(
    costs: { [x: string]: SystemNode },
    processed: String[],
  ): SystemNode {
    const name = Object.keys(costs).reduce((lowest, systemName) => {
      if (
        lowest === null ||
        costs[systemName].distance < costs[lowest].distance
      ) {
        if (!processed.includes(systemName)) {
          lowest = systemName;
        }
      }
      return lowest;
    }, null);
    return costs[name];
  }
}
