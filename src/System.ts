import tough from "tough-name-generator";

export default class System {
  name?: string;
  pathways: Array<System>;
  distanceToParent: number;
  constructor(name : string = tough.get(), pathways: Array<System> = [], distanceToParent: number = 0) {
    this.name = name;
    this.pathways = pathways;
    this.distanceToParent = distanceToParent;
  }
}