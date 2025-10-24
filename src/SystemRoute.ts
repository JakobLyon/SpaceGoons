import System from "./System";
import { DistanceType, intToDistanceType } from "./enums/DistanceTypeEnum";

export interface SystemRoute {
  destination: System;
  distanceType: DistanceType;
  distance: number;
}

export const createSystemRoute = (
  destination: System,
  distance: number,
): SystemRoute => {
  return {
    destination,
    distance,
    distanceType: intToDistanceType(distance),
  };
};
