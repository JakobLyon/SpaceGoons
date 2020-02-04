export const testSeed = "f0d8368d-85e2-54fb-73c4-2d60374295e3";
export const TRAVEL_DISTANCE_RANGE_MIN = 1;
export const TRAVEL_DISTANCE_RANGE_MAX = 9;

// Reward Supplies Consumed Ranges
export const LOW_REWARD_SUPPLIES_CONSUMED_MIN = -5;
export const LOW_REWARD_SUPPLIES_CONSUMED_MAX = -1;
export const MEDIUM_REWARD_SUPPLIES_CONSUMED_MIN = -10;
export const MEDIUM_REWARD_SUPPLIES_CONSUMED_MAX = -5;
export const HIGH_REWARD_SUPPLIES_CONSUMED_MIN = -15;
export const HIGH_REWARD_SUPPLIES_CONSUMED_MAX = -10;

// Risk Supplies Consumed Ranges
export const LOW_RISK_SUPPLIES_CONSUMED_MIN = 1;
export const LOW_RISK_SUPPLIES_CONSUMED_MAX = 5;
export const MEDIUM_RISK_SUPPLIES_CONSUMED_MIN = 5;
export const MEDIUM_RISK_SUPPLIES_CONSUMED_MAX = 10;
export const HIGH_RISK_SUPPLIES_CONSUMED_MIN = 10;
export const HIGH_RISK_SUPPLIES_CONSUMED_MAX = 15;

// Neutral Supplies Consumed
export const NEUTRAL_SUPPLIES_CONSUMED = 0;

// Reward Messages
export const getMinimumRewardsMessage = (): string => `Coasting on Solar Winds allows you to travel without using any supplies.`;
export const getLowRewardsMessage = (supplies: number): string => `A passing trader hears your story and gifts ${supplies} supplies.`
export const getMediumRewardsMessage = (supplies: number): string => `Salvaging some derelict ships you've come across yields ${supplies} supplies.`;
export const getHighRewardsMessage = (supplies: number): string => `A friendly freightor Captain heading the same way invites you aboard. She's kind enough to refill your ship with ${supplies} supplies while warping you to the next system.`;

// Risk Messages
export const getLowRiskMessage = (supplies: number): string => `An easy ride only costs you ${supplies} supplies.`;
export const getMediumRiskMessage = (supplies: number): string => `Space Pirates give you some trouble, but you are able to escape, costing you ${supplies} supplies.`
export const getHighRiskMessage = (supplies: number): string => `An arduous journey consisting of wrong turns and asteroid fields leaves you ${supplies} supplies short.`

// Neutral (no risk or reward) Message
export const getSmoothSailingMessage = (supplies: number): string =>
  `The bright light of the system approaches as you arrive unimpeded. You use only ${supplies} supplies.`;
