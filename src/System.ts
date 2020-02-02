import {Chance} from "chance";

export default class System {
  name?: string;
  pathways: Array<System>;
  distanceToParent: number;
  constructor(name : string = null, pathways: Array<System> = [], distanceToParent: number = 0) {
    this.name = name ? name : new Chance().name();
    this.pathways = pathways;
    this.distanceToParent = distanceToParent;
  }
}