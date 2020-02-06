export default class Player {
  supplies: number;
  distanceTraveled: number;
  constructor(supplies: number = 10) {
    this.supplies = supplies;
  }

  travel(distance = 0) {
    this.supplies -= distance;
    this.distanceTraveled += distance;
  }
}