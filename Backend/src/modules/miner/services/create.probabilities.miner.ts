import type { Minerals } from "../../../entities_base/minerals";

const MIN_PROBABILITY = 0.1;
const MAX_PROBABILITY = 2;

type Mineral = (typeof Minerals)[number]["name"];

type ProbabilityRatio = {
  numerator: number;
  denominator: number;
};

export type MinerProbabilities = {
  [K in Mineral]: number;
};

export const createProbabilityFromLogarithm = (probabilityRatio: {
  numerator: number;
  denominator: number;
}) => {
  const ratio = probabilityRatio.numerator / probabilityRatio.denominator;

  return Math.log((ratio - MIN_PROBABILITY) / (MAX_PROBABILITY - ratio));
};

export function createMinerProbabilities(
  probabilityRatios: Readonly<Record<Mineral, ProbabilityRatio>>,
): MinerProbabilities {
  const probabilityEntries = Object.entries(probabilityRatios) as [
    Mineral,
    ProbabilityRatio,
  ][];

  return Object.fromEntries(
    probabilityEntries.map(([mineralName, probabilityRatio]) => [
      mineralName,
      createProbabilityFromLogarithm(probabilityRatio),
    ]),
  ) as MinerProbabilities;
}

export const createProbabilities = (
  minerLevel: number,
  baseProbability: number,
) => {
  const exponent = -(minerLevel + baseProbability);
  const logisticDenominator = 1 + Math.E ** exponent;
  const probabilityRange =
    (MAX_PROBABILITY - MIN_PROBABILITY) * (1 / logisticDenominator);

  return probabilityRange + MIN_PROBABILITY;
};
