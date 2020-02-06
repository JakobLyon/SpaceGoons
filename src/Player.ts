export default class Player {
  supplies: number;
  constructor(supplies: number = 10) {
    this.supplies = supplies;
  }

  getSuppliesCount() {
     return this.supplies;
  }

  travel(distance = 0) {
    this.supplies -= distance;
  }
}