/**
 * Given context (player, route, etc),
 * builds a weighted table of possible events
 * and rolls to determine which event occurs.
 * @param context 
 * @returns 
 */

import Player from "../domain/Player"
import { SystemRoute } from "../domain/SystemRoute"
import StarSystem from "../domain/StarSystem"

import { SystemType } from "../enums/SystemTypeEnum";

// Map of system type names to risk modifiers. Use string keys to avoid
// referencing an enum that isn't imported in this file.
const SystemTypeRiskModifier: Record<string, number> = {
  [SystemType.FLEET_COMMAND]: 0.5,
  [SystemType.TRADE_SECTOR]: 0.8,
  [SystemType.PIRATE_LAIR]: 1.2,
  [SystemType.ANOMALY]: 1.5,
}

interface TravelContext {
  player: Player
  route: SystemRoute
  system: StarSystem
}

export const resolveTravelEvent = ({ player, route, system }: TravelContext): SpaceGoonsEvent => {
  const weights = buildWeights(player, route, system);
  const event = rollEvent(weights, EVENT_TABLE)
  return event;
}

function buildWeights(player: Player, route: SystemRoute, system: StarSystem) {
    return {
        "nothing": 0.5,
        "loss": 0.2,
        "gain": 0.2,
    }
}
