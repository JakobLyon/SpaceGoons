import SystemCollection from "./SystemCollection";
import Range from "./Range";
import tough from "tough-name-generator";
import System from "./System";

export class Galaxy {
  name: string;
  startingSystem: System = null;
  size: number;
  clusters: Array<SystemCollection> = [];
  constructor(name: string = null, size: number = 10) {
    this.name = name ? name : tough.get();
    this.size = size;
  }

  getFirstCluster(): SystemCollection {
    return this.clusters[0];
  }

  /*
    0 - easy
    1 - medium
    2 - hard

    creates a network of systems
  */
  generateGalaxy(difficulty: number = 0) {
    const easy = [7, 10];
    const medium = [10, 15];
    const hard = [15, 20];

    // determine ranges based on difficulty -- implement difficulty later
    let minSystems, maxSystems, minWidth, maxWidth;
    switch(difficulty) {
      case 1:
        minSystems = medium[0];
        maxSystems = medium[1];
      case 2:
        minSystems = hard[0];
        maxSystems = hard[1];
        break;
      default:
        minSystems = easy[0];
        maxSystems = easy[1];
        break;
    }
    
    // TODO: width correlated with difficulty
    const layerWidthRange = new Range(4, 6);
    // TODO: distance correlated with difficulty
    const distanceToParentRange = new Range(1, 9);
    
    const END_CLUSTER_SIZE = 1;
    const BEGIN_CLUSTER_SIZE = 1;

    let newCluster;
    // Add end cluster
    this.clusters.push(new SystemCollection(END_CLUSTER_SIZE));
    
    // create rest of galaxy
    // hard coded, implement difficulty settings later
    const numOfLayers = new Range(10, 15).getRandomInRange();
    for (var i = 0; i < numOfLayers; i++) {
      // create galaxy layer (systemcol)
      let newCluster = new SystemCollection(layerWidthRange.getRandomInRange());
      // link layer to previous
      newCluster.linkSystems(this.getFirstCluster());
      this.clusters.unshift(newCluster);
    }

    // create start cluster
    const startCluster = new SystemCollection(BEGIN_CLUSTER_SIZE);
    startCluster.linkSystems(this.getFirstCluster(), true);
    this.startingSystem = startCluster.systems[0];
    this.size = this.clusters.length;
  }
}