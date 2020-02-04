import System from "./System";
import { DistanceType } from "./interfaces/DistanceTypeEnum";

export interface SystemRoute {
  destination: System;
  distanceType: DistanceType;
  distance: number;
}

export const createSystemRoute = (
  destination: System,
  distance: number
): SystemRoute => {
  let distanceType: number;
  switch (distance) {
    case 1:
    case 2:
    case 3:
      distanceType = DistanceType.Short;
      break;
    case 4:
    case 5:
    case 6:
      distanceType = DistanceType.Medium;
      break;
    default:
      distanceType = DistanceType.Long;
  }
  return {
    destination,
    distance,
    distanceType
  };
};