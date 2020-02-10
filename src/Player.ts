export default class Player {
  supplies: number;
  distanceTraveled: number;
  constructor(supplies: number = 10, distanceTraveled: number = 0) {
    this.supplies = supplies;
    this.distanceTraveled = distanceTraveled;
  }

  travel(supplies: number = 0, distance: number = 0) {
    this.supplies -= supplies;
    this.distanceTraveled += distance;
  }
}