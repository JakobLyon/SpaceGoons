import { Chance } from "chance";
import { SystemRoute } from "./SystemRoute";
import { getRiskRewardChance } from "./RiskReward";
import { SystemNode } from "./interfaces/SystemNode";

export default class System {
  name: string;
  routes: Array<SystemRoute>;
  distanceToParent: number;
  constructor(generator: Chance.Chance = new Chance()) {
    this.name = generator.name();
    this.routes = [];
  }

  travelOptions = (): string => {
    return this.routes
      .map((systemRoute, index) => {
        const { riskChance, rewardChance } = getRiskRewardChance(
          systemRoute.distanceType
        );
        return `${index}: ${systemRoute.destination.name}, ${
          systemRoute.distance
        } Lightyears, Chance of Risk: ${riskChance.toLocaleString("en", {
          style: "percent"
        })}, Chance of Reward: ${rewardChance.toLocaleString("en", {
          style: "percent"
        })}`;
      })
      .join("\n");
  };

  /**
   * {
   * costs: {
   *  [systemName]: distance<number>,
   *  ...
   * },
   * parents: {
   *   [systemName]: systemsParent<string>,
   *   ...
   * }
   * }
   */
  createChildrenMapping = (
    finalDestination: System,
    costs: { [x: string]: SystemNode } = null,
    parents = null,
    processed: Array<string> = []
  ): {
    costs: { [x: string]: SystemNode };
    parents: { [x: string]: string };
  } => {
    if (this.name === finalDestination.name) {
      return;
    }

    /**
     * {
     *  [childName]: {
     *    node,
     *    distance
     *  },
     * ...
     * }
     */
    if (!costs) {
      costs = {
        [finalDestination.name]: {
          system: finalDestination,
          distance: Infinity
        },
        ...this.routes.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.destination.name]: {
              system: cur.destination,
              distance: cur.distance
            }
          };
        }, {})
      };
    }

    if (!parents) {
      parents = { [finalDestination.name]: null };
    }
    this.routes.forEach(route => {
      parents[route.destination.name] = this.name;
    });

    const nextToProcess = [];
    let node = this.lowestCostNode(costs, processed);
    while (node) {
      let systemNode = costs[node.system.name];
      node.system.routes.forEach(route => {
        let newCost = systemNode.distance + route.distance;
        if (!costs[route.destination.name]) {
          costs[route.destination.name] = {
            system: route.destination,
            distance: newCost
          };
          parents[route.destination.name] = node.system.name;
        }
        if (costs[route.destination.name].distance > newCost) {
          costs[route.destination.name] = {
            system: route.destination,
            distance: newCost
          };
          parents[route.destination.name] = node.system.name;
        }
        nextToProcess.push(...route.destination.routes);
      });
      processed.push(node.system.name);
      node = this.lowestCostNode(costs, processed);
    }

    nextToProcess.forEach(route => {
      route.destination.createChildrenMapping(
        finalDestination,
        costs,
        parents,
        processed
      );
    });

    return { costs, parents };
  };

  private lowestCostNode(
    costs: { [x: string]: SystemNode },
    processed: String[]
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
