type SpaceGoonsEvent = {
  id: string;
  type: 'nothing' | 'loss' | 'gain' | 'encounter';
  weight: number;
  apply: () => void;
};
