export default class Player {
  supplies: number;
  distanceTraveled: number;
  constructor(supplies: number = 10, distanceTraveled: number = 45) {
    this.supplies = supplies;
    this.distanceTraveled = this.distanceTraveled;
  }

  travel(distance = 0) {
    this.supplies -= distance;
    this.distanceTraveled += distance;
  }
}