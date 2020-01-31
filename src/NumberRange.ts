import { Chance } from "chance";

/**
 * Class NumberRange
 *
 * Represents a range of numbers with associated functionality
 *
 * min       - number:  lowest part of range
 * max       - number:  highest part of range
 * seed      - string:  seed to use with generator to reproduce results
 * generator - Object:  allows for dependency injection of generator, by default uses Chance.js
 */
export default class NumberRange {
  min: number;
  max: number;
  seed: string;
  private generator: any;
  constructor(
    min: number = 0,
    max: number = 1,
    seed: string = null,
    generator: Object = null
  ) {
    this.min = min;
    this.max = max;
    this.seed = seed;
    this.generator = generator ? generator : new Chance(seed);
  }

  /**
   * Params - none
   * Return - Number
   * 
   * Returns a random number in the previously provided range
   */
  getRandomInRange(): number {
    return this.generator.integer({ min: this.min, max: this.max });
  }
}
