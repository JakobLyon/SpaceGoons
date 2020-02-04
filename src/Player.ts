export default class Player {
  name: string;
  supplies: number;
  constructor(name: string = null, supplies: number = 10) {
    this.name = name;
    this.supplies = supplies;
  }

  getSuppliesCount() {
     return this.supplies;
  }

  travel(distance = 0) {
    this.supplies -= distance;
  }
}