import { DistanceType } from "./enums/DistanceTypeEnum";
import StarSystem from "./StarSystem";
import { SystemRoute } from "./SystemRoute";

export class Pathfinder {
  /**
   *
   * @param start The starting StarSystem
   * @returns     A Mapping of system names to the shortest route info and parent links
   */
  static computeShortestPaths = (
    start: StarSystem,
  ): Record<string, string | null> => {
    const costs: Record<string, SystemRoute> = {};
    const routeToDestination: Record<string, string | null> = {};
    const processed = new Set<string>();

    // Initialize all connected systems
    for (const route of start.routes) {
      costs[route.destination.name] = {
        destination: route.destination,
        distance: route.distance,
        distanceType: route.distanceType,
      };
    }

    routeToDestination[start.name] = null;

    let systemRoute = Pathfinder.lowestCostRoute(costs, processed);
    while (systemRoute) {
      const currentSystem = systemRoute.destination;

      for (const route of currentSystem.routes) {
        const newCost = systemRoute.distance + route.distance;

        const currentCost = costs[route.destination.name]?.distance;
        if (currentCost === null || newCost < currentCost) {
          costs[route.destination.name] = {
            destination: route.destination,
            distance: newCost,
            distanceType: DistanceType.Long,
          };
        }
        routeToDestination[route.destination.name] = currentSystem.name;
      }

      processed.add(currentSystem.name);
      systemRoute = Pathfinder.lowestCostRoute(costs, processed);
    }

    return routeToDestination;
  };

  /**
   * Returns the next immediate route along the shortest path from a start system
   * to the given destination
   *
   * @param start       The starting system
   * @param destination The target system
   * @returns           The next SystemRoute to take, or null if no path exists
   */
  static getNextShortestRoute(
    start: StarSystem,
    destination: StarSystem,
  ): SystemRoute | null {
    const routeToDestination = Pathfinder.computeShortestPaths(start);

    if (!routeToDestination[destination.name]) {
      return null;
    }

    // Backtrack from destination to find first hop from start
    let current = destination.name;
    while (
      routeToDestination[current] &&
      routeToDestination[routeToDestination[current]!] !== null
    ) {
      current = routeToDestination[current]!;
    }

    return (
      start.routes.find((route) => route.destination.name === current) ?? null
    );
  }

  /**
   * Utility function to find the lowest-cost unprocessed route
   */
  private static lowestCostRoute(
    costs: Record<string, SystemRoute>,
    processed: Set<string>,
  ): SystemRoute | null {
    let lowest: SystemRoute | null = null;
    for (const [systemName, route] of Object.entries(costs)) {
      if (
        !processed.has(systemName) &&
        (!lowest || route.distance < lowest.distance)
      ) {
        lowest = route;
      }
    }
    return lowest;
  }
}
