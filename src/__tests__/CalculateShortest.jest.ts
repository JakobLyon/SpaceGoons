import { calculateShortest } from "../CalculateShortest";
import Galaxy from "../Galaxy";
import { testSeed } from "../constants";
import { Chance } from "chance";

describe("Calculate Shortest tests", () => {
  it("", () => {
    const testGenerator = new Chance(testSeed);
    const testGalaxy = new Galaxy(testGenerator);
    testGalaxy.generateGalaxy(5);
    const { distance, nextStop } = calculateShortest(
      testGalaxy.startingSystem,
      testGalaxy.destinationSystem,
    );

    expect(distance).toBe(12);
    expect(nextStop).toStrictEqual(
      testGalaxy.startingSystem.routes[3].destination,
    );
  });

  it("", () => {
    const testGenerator = new Chance(testSeed);
    const testGalaxy = new Galaxy(testGenerator);
    testGalaxy.generateGalaxy(1);
    const { distance, nextStop } = calculateShortest(
      testGalaxy.startingSystem,
      testGalaxy.destinationSystem,
    );

    expect(distance).toBe(5);
    expect(nextStop).toStrictEqual(
      testGalaxy.startingSystem.routes[0].destination,
    );
  });
});
