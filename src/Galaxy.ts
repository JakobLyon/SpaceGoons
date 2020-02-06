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
    generator: Chance.Chance = new Chance()
  ) {
    this.generator = generator;
    this.name = this.generator.name();
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
  generateGalaxy() {
    // TODO: width correlated with difficulty
    const layerWidthRange = new Range(4, 6);

    const END_CLUSTER_SIZE = 1;
    const BEGIN_CLUSTER_SIZE = 1;

    let newCluster;

    // Add end cluster
    this.clusters.push(new SystemCluster(END_CLUSTER_SIZE, this.generator));
    this.destinationSystem = this.getFirstCluster().systems[0];

    // create rest of galaxy
    // hard coded, implement difficulty settings later
    const numOfClusters = 10;
    for (var i = 0; i < numOfClusters; i++) {
      // create galaxy layer (systemcol)
      newCluster = new SystemCluster(
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
    this.clusters.unshift(startCluster);
    this.startingSystem = startCluster.systems[0];
    this.size = this.clusters.length;
  }
}