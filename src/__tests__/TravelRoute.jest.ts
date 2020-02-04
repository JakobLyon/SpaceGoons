import { travelRoute } from "../TravelRoute";
import { createSystemRoute } from "../SystemRoute";
import { testSeed } from "../constants";
import { Chance } from "chance";
import System from "../System";
import { TravelResult } from "../interfaces/TravelResult";

describe("TravelRoute tests", () => {
  it("Creates the expected result when traveling", () => {
    const generator = new Chance(testSeed);
    const system = new System(undefined, undefined, undefined, generator);
    const distance = 5;
    const route = createSystemRoute(system, distance);
    const expectedTravelResult: TravelResult = {
      message: "",
      suppliesConsumed: 0,
      travelSuccessful: true
    };

    expect(travelRoute(route, generator)).toStrictEqual(expectedTravelResult);
  });
});
