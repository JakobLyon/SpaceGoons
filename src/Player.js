export class Player {
  constructor(name = null, supplies = 10) {
    this.name = name;
    this.supplies = supplies;
  }

  getSuppliesCount() {
     return this.supplies;
  }

  travel(distance = 0) {
    this.supplies = this.supplies - distance;
  }
}