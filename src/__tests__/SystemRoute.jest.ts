import { SystemRoute, createSystemRoute } from "../SystemRoute";
import System from "../System";
import { DistanceType } from "../interfaces/DistanceTypeEnum";
import { Chance } from "chance";
import { testSeed } from "../constants";

describe("SystemRoute tests", () => {
  it("Creates a SystemRoute of distance 5", () => {
    const generator = new Chance(testSeed);
    const testSystem = new System(undefined, undefined, undefined, generator);
    const distance = 5;
    const expectedSystemRoute: SystemRoute = {
      destination: testSystem,
      distanceType: DistanceType.Long,
      distance
    };

    expect(createSystemRoute(testSystem, distance)).toStrictEqual(expectedSystemRoute);
  });
});
