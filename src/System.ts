import { Chance } from "chance";
import { SystemRoute } from "./SystemRoute";
import { getRiskRewardChance } from "./RiskReward";

export default class System {
  name: string;
  routes: Array<SystemRoute>;
  distanceToParent: number;
  constructor(generator: Chance.Chance = new Chance()) {
    this.name = generator.name();
    this.routes = [];
  }

  travelOptions = (): string => {
    return this.routes
      .map((systemRoute, index) => {
        const { riskChance, rewardChance } = getRiskRewardChance(
          systemRoute.distanceType
        );
        return `${index}: ${systemRoute.destination.name}, ${
          systemRoute.distance
        } Lightyears, Chance of Risk: ${riskChance.toLocaleString("en", {
          style: "percent"
        })}, Chance of Reward: ${rewardChance.toLocaleString("en", {
          style: "percent"
        })}`;
      })
      .join("\n");
  };
}
