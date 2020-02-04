import { SystemRoute } from "./SystemRoute";
import { DistanceType } from "./interfaces/DistanceTypeEnum";
import { TravelResult } from "./interfaces/TravelResult";

export const travelRoute = (
  route: SystemRoute,
  generator: Chance.Chance
): TravelResult => {
  let risk: number, reward: number;
  switch (route.distanceType) {
    case DistanceType.Short:
      reward = 0;
      risk = 0.7;
      break;
    case DistanceType.Medium:
      reward = 0.45;
      risk = 0.9;
      break;
    default:
      reward = 0.65;
      risk = 0.9;
  }

  const riskOrReward = generator.floating({ min: 0, max: 1 });
  const outcome = generator.floating({ min: 0, max: 1 });

  if (riskOrReward < reward) {
    return calculateReward(outcome, generator);
  } else if (reward < riskOrReward && riskOrReward < risk) {
    return calculateRisk(outcome, route.distance, generator);
  } else {
    return {
      message: `The bright light of the system approaches as you arrive unimpeded. You use only ${route.distance} supplies.`,
      suppliesConsumed: route.distance,
      travelSuccessful: true
    };
  }
};

function calculateReward(
  rewardRoll: number,
  generator: Chance.Chance
): TravelResult {
  let suppliesConsumed: number;
  if (rewardRoll <= 0.25) {
    suppliesConsumed = generator.integer({ min: -5, max: -1 });
    return {
      message: `A passing trader hears your story and gifts ${suppliesConsumed} supplies.`,
      suppliesConsumed,
      travelSuccessful: true
    };
  } else if (rewardRoll <= 0.75) {
    suppliesConsumed = generator.integer({ min: -10, max: -5 });
    return {
      message: `Salvaging some derelict ships you've come across yields ${suppliesConsumed} supplies.`,
      suppliesConsumed,
      travelSuccessful: true
    };
  } else if (rewardRoll <= 0.9) {
    suppliesConsumed = generator.integer({ min: -15, max: -10 });
    return {
      message: `A friendly freightor Captain heading the same way invites you aboard. She's kind enough to refill your ship with ${suppliesConsumed} supplies while warping you to the next system.`,
      suppliesConsumed,
      travelSuccessful: true
    };
  } else {
    return {
      message: `Coasting on Solar Winds allows you to travel without using any supplies.`,
      suppliesConsumed: 0,
      travelSuccessful: true
    };
  }
}

function calculateRisk(
  riskRoll: number,
  distance: number,
  generator: Chance.Chance
): TravelResult {
  let suppliesConsumed: number;
  if (riskRoll <= 0.25) {
    suppliesConsumed = generator.integer({ min: 1, max: 5 });
    return {
      message: `An easy ride only costs you ${suppliesConsumed} supplies.`,
      suppliesConsumed,
      travelSuccessful: true
    };
  } else if (riskRoll <= 0.65) {
    suppliesConsumed = generator.integer({ min: 5, max: 10 });
    return {
      message: `Space Pirates give you some trouble, but you are able to escape, costing you ${suppliesConsumed} supplies.`,
      suppliesConsumed,
      travelSuccessful: true
    };
  } else if (riskRoll <= 0.9) {
    suppliesConsumed = generator.integer({ min: 10, max: 15 });
    return {
      message: `An arduous journey consisting of wrong turns and asteroid fields leaves you ${suppliesConsumed} supplies short.`,
      suppliesConsumed: distance,
      travelSuccessful: false
    };
  }
}
