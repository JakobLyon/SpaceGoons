import { travelRoute } from "../TravelRoute";
import { createSystemRoute } from "../SystemRoute";
import { testSeed, getSmoothSailingMessage } from "../constants";
import { Chance } from "chance";
import System from "../System";
import { TravelResult } from "../interfaces/TravelResult";

describe("TravelRoute tests", () => {
  it("Smooth sailing Reward", () => {
    const generator = new Chance(testSeed);
    const system = new System(generator);
    const distance = 5;
    const route = createSystemRoute(system, distance);
    const expectedTravelResult: TravelResult = {
      message: getSmoothSailingMessage(distance),
      suppliesConsumed: 5,
      travelSuccessful: true,
    };

    expect(travelRoute(route, generator)).toStrictEqual(expectedTravelResult);
  });
});
