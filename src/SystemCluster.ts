import Range from "./NumberRange";
import System from "./System";

export default class SystemCluster {
  systems: Array<System> = [];

  /*
    size - number: how many systems to initialize
  */
  constructor(size: number = 0) {
    for (var i = 0; i < size; i++) {
      this.systems.push(new System());
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
  linkSystems(nextCluster: SystemCluster, linkAllPaths: boolean = false) {
    const distanceRange = new Range(1, 9);
    this.systems.forEach(system => {
      const nextSystemsToLink = linkAllPaths
        ? this.systems
        : nextCluster.getSystemsToLink();
      system.pathways = [...nextSystemsToLink];
      nextSystemsToLink.forEach(nextSystem => {
        nextSystem.distanceToParent = distanceRange.getRandomInRange();
      });
    });
  }

  /**
   * Params - null
   * Return - Array<System>: a Cluster of Star Systems
   */
  private getSystemsToLink(): Array<System> {
    const range = new Range(0, this.systems.length - 1);
    const indexToNotInclude = range.getRandomInRange();
    return [...this.systems].splice(indexToNotInclude, 1);
  }
}
