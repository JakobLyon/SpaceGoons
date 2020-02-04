import Galaxy from "../Galaxy";
import { Chance } from "chance";

describe("Galaxy Class tests", () => {
  it("Generates a default Galaxy of the correct size", () => {
    const testGenerator = new Chance("f0d8368d-85e2-54fb-73c4-2d60374295e3");
    const testGalaxy = new Galaxy(null, testGenerator);
    testGalaxy.generateGalaxy();

    expect(testGalaxy.size).toBe(14);
    expect(testGalaxy.name).toBe("Cory Vargas");
    expect(testGalaxy.startingSystem.name).toBe("Elsie Roberts");
  });
});
