export enum DistanceType {
  Short,
  Medium,
  Long,
}

export const intToDistanceType = (number: number): DistanceType => {
  switch (number) {
    case 1:
    case 2:
    case 3:
      return DistanceType.Short;
    case 4:
    case 5:
    case 6:
      return DistanceType.Medium;
    default:
      return DistanceType.Long;
  }
};
