export function calculateNormalDistributionForMinerForce(
  userLevel: number,
  levelCandidate: number,
) {
  const distributionMean = userLevel;
  const standardDeviation = 4;

  const normalDistributionDenominator =
    standardDeviation * Math.sqrt(2 * Math.PI);
  const normalizationFactor = 1 / normalDistributionDenominator;

  const squaredStandardizedDistance =
    ((levelCandidate - distributionMean) / standardDeviation) ** 2;
  const negativeHalfDistance = -0.5 * squaredStandardizedDistance;
  const exponentialTerm = Math.E ** negativeHalfDistance;

  return normalizationFactor * exponentialTerm;
}

export const calculateMinerForce = (userLevel: number, maxLavel: number) => {
  const levels = Array.from({ length: maxLavel }, (_x, i) => i + 1);
  const randomNumber = Math.random();

  const probsOfLevels = levels.map((level) => {
    return calculateNormalDistributionForMinerForce(userLevel, level);
  });

  const totalProbs = probsOfLevels.reduce((acc, value) => acc + value, 0);
  const probsNorm = probsOfLevels.map((probLevel) => probLevel / totalProbs);

  let selectedLevel = 1;
  let accumulatedProbability = 0;

  for (let i = 0; i < maxLavel; i++) {
    accumulatedProbability += probsNorm[i]!;

    if (accumulatedProbability >= randomNumber) {
      selectedLevel = levels[i]!;
      break;
    }
  }

  return {
    level: selectedLevel,
  };
};
