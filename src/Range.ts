export default class Range {
  min: number;
  max: number;
  constructor(min: number = 0, max: number = 1) {
    this.min = min;
    this.max = max;
  }

  getRandomInRange(): number {
    return Math.floor(Math.random() * (this.max - this.min) + this.min);
  }
};
