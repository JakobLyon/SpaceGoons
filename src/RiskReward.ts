import { DistanceType } from "./enums/DistanceTypeEnum";

export interface RiskReward {
  riskChance: number;
  rewardChance: number;
}

export const getRiskRewardChance = (distanceType: DistanceType): RiskReward => {
  switch (distanceType) {
    case DistanceType.Short:
      return {
        rewardChance: 0,
        riskChance: 0.7
      };
    case DistanceType.Medium:
      return {
        rewardChance: 0.45,
        riskChance: 0.9
      };
    default:
      return {
        rewardChance: 0.65,
        riskChance: 0.9
      };
  }
};
