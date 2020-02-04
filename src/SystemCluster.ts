import Range from "./NumberRange";
import System from "./System";
import { Chance } from "chance";
import { SystemRoute } from "./SystemRoute";
import {
  TRAVEL_DISTANCE_RANGE_MIN,
  TRAVEL_DISTANCE_RANGE_MAX
} from "./constants";
import { intToDistanceType } from "./enums/DistanceTypeEnum";

export default class SystemCluster {
  systems: Array<System> = [];
  generator: Chance.Chance;

  /*
    size - number: how many systems to initialize
  */
  constructor(size: number = 0, generator: Chance.Chance = new Chance()) {
    this.generator = generator;
    for (var i = 0; i < size; i++) {
      this.systems.push(new System(this.generator));
    }
  }

  /**
   * Link the given Cluster as the next node to the current Cluster
   *
   * Params:
   *        nextCluster -  SystemCluster: collection of systems that come after current cluster
   *        linkAllPaths - bool:             a flag determining whether to link all systems or to link n systems to n - 1 systems
   *
   * Return - null
   */
  linkSystems(nextCluster: SystemCluster) {
    this.systems.forEach(system => {
      system.routes = nextCluster.getSystemsToLink();
    });
  }

  /**
   * Params - null
   * Return - Array<System>: a Cluster of Star Systems
   */
  private getSystemsToLink(): Array<SystemRoute> {
    const indexToNotInclude: number = this.generator.integer({
      min: 0,
      max: this.systems.length - 1
    });
    return [...this.systems].splice(indexToNotInclude, 1).map(system => {
      const distance = this.generator.integer({
        min: TRAVEL_DISTANCE_RANGE_MIN,
        max: TRAVEL_DISTANCE_RANGE_MAX
      });
      return {
        destination: system,
        distanceType: intToDistanceType(distance),
        distance
      };
    });
  }
}
