import { SystemRoute } from "./SystemRoute";
import { TravelResult } from "./interfaces/TravelResult";
import { getRiskRewardChance } from "./RiskReward";
import {
  getSmoothSailingMessage,
  getLowRewardsMessage,
  getMediumRewardsMessage,
  getHighRewardsMessage,
  getMinimumRewardsMessage,
  getLowRiskMessage,
  getMediumRiskMessage,
  getHighRiskMessage,
  LOW_REWARD_SUPPLIES_CONSUMED_MIN,
  LOW_REWARD_SUPPLIES_CONSUMED_MAX,
  MEDIUM_REWARD_SUPPLIES_CONSUMED_MIN,
  MEDIUM_REWARD_SUPPLIES_CONSUMED_MAX,
  HIGH_REWARD_SUPPLIES_CONSUMED_MIN,
  HIGH_REWARD_SUPPLIES_CONSUMED_MAX,
  NEUTRAL_SUPPLIES_CONSUMED,
  LOW_RISK_SUPPLIES_CONSUMED_MIN,
  LOW_RISK_SUPPLIES_CONSUMED_MAX,
  MEDIUM_RISK_SUPPLIES_CONSUMED_MIN,
  MEDIUM_RISK_SUPPLIES_CONSUMED_MAX,
  HIGH_RISK_SUPPLIES_CONSUMED_MIN,
  HIGH_RISK_SUPPLIES_CONSUMED_MAX,
} from "./constants";

export const travelRoute = (
  route: SystemRoute,
  generator: Chance.Chance,
): TravelResult => {
  const { riskChance, rewardChance } = getRiskRewardChance(route.distanceType);

  const riskOrReward = generator.floating({ min: 0, max: 1 });
  const outcome = generator.floating({ min: 0, max: 1 });

  if (riskOrReward < rewardChance) {
    return calculateReward(outcome, generator);
  } else if (riskOrReward < riskChance + rewardChance) {
    return calculateRisk(outcome, route.distance, generator);
  } else {
    return {
      message: getSmoothSailingMessage(route.distance),
      suppliesConsumed: route.distance,
      travelSuccessful: true,
    };
  }
};

function calculateReward(
  rewardRoll: number,
  generator: Chance.Chance,
): TravelResult {
  let suppliesConsumed: number;
  if (rewardRoll <= 0.25) {
    suppliesConsumed = generator.integer({
      min: LOW_REWARD_SUPPLIES_CONSUMED_MIN,
      max: LOW_REWARD_SUPPLIES_CONSUMED_MAX,
    });
    return {
      message: getLowRewardsMessage(Math.abs(suppliesConsumed)),
      suppliesConsumed,
      travelSuccessful: true,
    };
  } else if (rewardRoll <= 0.75) {
    suppliesConsumed = generator.integer({
      min: MEDIUM_REWARD_SUPPLIES_CONSUMED_MIN,
      max: MEDIUM_REWARD_SUPPLIES_CONSUMED_MAX,
    });
    return {
      message: getMediumRewardsMessage(Math.abs(suppliesConsumed)),
      suppliesConsumed,
      travelSuccessful: true,
    };
  } else if (rewardRoll <= 0.9) {
    suppliesConsumed = generator.integer({
      min: HIGH_REWARD_SUPPLIES_CONSUMED_MIN,
      max: HIGH_REWARD_SUPPLIES_CONSUMED_MAX,
    });
    return {
      message: getHighRewardsMessage(Math.abs(suppliesConsumed)),
      suppliesConsumed,
      travelSuccessful: true,
    };
  } else {
    return {
      message: getMinimumRewardsMessage(),
      suppliesConsumed: NEUTRAL_SUPPLIES_CONSUMED,
      travelSuccessful: true,
    };
  }
}

function calculateRisk(
  riskRoll: number,
  distance: number,
  generator: Chance.Chance,
): TravelResult {
  let suppliesConsumed: number;
  if (riskRoll <= 0.25) {
    suppliesConsumed = generator.integer({
      min: LOW_RISK_SUPPLIES_CONSUMED_MIN,
      max: LOW_RISK_SUPPLIES_CONSUMED_MAX,
    });
    return {
      message: getLowRiskMessage(suppliesConsumed),
      suppliesConsumed,
      travelSuccessful: true,
    };
  } else if (riskRoll <= 0.65) {
    suppliesConsumed = generator.integer({
      min: MEDIUM_RISK_SUPPLIES_CONSUMED_MIN,
      max: MEDIUM_RISK_SUPPLIES_CONSUMED_MAX,
    });
    return {
      message: getMediumRiskMessage(suppliesConsumed),
      suppliesConsumed,
      travelSuccessful: true,
    };
  } else if (riskRoll <= 0.9) {
    suppliesConsumed = generator.integer({
      min: HIGH_RISK_SUPPLIES_CONSUMED_MIN,
      max: HIGH_RISK_SUPPLIES_CONSUMED_MAX,
    });
    return {
      message: getHighRiskMessage(suppliesConsumed),
      suppliesConsumed: suppliesConsumed,
      travelSuccessful: true,
    };
  } else {
    return {
      message: getHighRiskMessage(distance),
      suppliesConsumed: distance,
      travelSuccessful: false,
    };
  }
}
