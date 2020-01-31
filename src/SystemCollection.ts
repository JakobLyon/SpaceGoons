import Range from "./Range";
import System from "./System";

export default class SystemCollection {
  systems: Array<System> = [];

  /*
    size - how many systems to initialize
  */
  constructor(size: number = 0) {
    for (var i = 0; i < size; i++) {
      this.systems.push(new System());
    }
  }

  /*
    nextCluster - cluster of systems that come after current cluster
    linkAllPaths - a flag determining whether to link all systems or to link n systems to n - 1 systems
  */
  linkSystems(nextCluster: SystemCollection, linkAllPaths: boolean = false) {
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

  getSystemsToLink(): Array<System> {
    const range = new Range(0, this.systems.length - 1);
    const indexToNotInclude = range.getRandomInRange();
    return [...this.systems].splice(indexToNotInclude, 1);
  }
};
