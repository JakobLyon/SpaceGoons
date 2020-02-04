import SystemCluster from "./SystemCluster";
import Range from "./NumberRange";
import { Chance } from "chance";
import System from "./System";

export default class Galaxy {
  name: string;
  startingSystem: System = null;
  destinationSystem: System = null;
  size: number;
  clusters: Array<SystemCluster> = [];
  generator: Chance.Chance;
  constructor(
    size: number = 10,
    generator: Chance.Chance = new Chance()
  ) {
    this.generator = generator;
    this.name = name ? name : this.generator.name();
    this.size = size;
  }

  private getFirstCluster(): SystemCluster {
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
    switch (difficulty) {
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
    this.clusters.push(new SystemCluster(END_CLUSTER_SIZE, this.generator));
    this.destinationSystem = this.getFirstCluster().systems[0];

    // create rest of galaxy
    // hard coded, implement difficulty settings later
    const numOfLayers = new Range(10, 15).getRandomInRange();
    for (var i = 0; i < numOfLayers; i++) {
      // create galaxy layer (systemcol)
      let newCluster = new SystemCluster(
        layerWidthRange.getRandomInRange(),
        this.generator
      );
      // link layer to previous
      newCluster.linkSystems(this.getFirstCluster());
      this.clusters.unshift(newCluster);
    }

    // create start cluster
    const startCluster = new SystemCluster(BEGIN_CLUSTER_SIZE, this.generator);
    startCluster.linkSystems(this.getFirstCluster());
    this.startingSystem = startCluster.systems[0];
    this.size = this.clusters.length;
  }
}