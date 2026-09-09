import type { Minerals } from "./minerals";

type Mineral = (typeof Minerals)[number]["name"];

type ProbabilityRatio = {
  numerator: number;
  denominator: number;
};

type Probs = {
  [K in Mineral]: ProbabilityRatio;
};

type MinersValuesBase = {
  type: string;
  maxLevel: number;
  maxCapacity: number;
  cost: number;
  probs: Probs;
  updateCost: number;
};

export const miners = [
  {
    type: "beginner",
    cost: 2,
    maxLevel: 25,
    maxCapacity: 7,
    updateCost: 2,
    probs: {
      coal: { numerator: 7, denominator: 1 },
      copper: { numerator: 3, denominator: 2 },
      iron: { numerator: 4, denominator: 2 },
      diamond: { numerator: 3, denominator: 2 },
      ruby: { numerator: 4, denominator: 5 },
      teracotta: { numerator: 4, denominator: 10 },
      esmerald: { numerator: 4, denominator: 5 },
    },
  },
  {
    type: "intermediate",
    cost: 3,
    maxLevel: 35,
    maxCapacity: 17,
    updateCost: 3,
    probs: {
      coal: { numerator: 7, denominator: 1 },
      copper: { numerator: 3, denominator: 2 },
      iron: { numerator: 4, denominator: 2 },
      diamond: { numerator: 3, denominator: 2 },
      ruby: { numerator: 4, denominator: 5 },
      teracotta: { numerator: 4, denominator: 10 },
      esmerald: { numerator: 4, denominator: 5 },
    },
  },
  {
    type: "expert",
    cost: 3,
    maxLevel: 50,
    maxCapacity: 25,
    updateCost: 5,
    probs: {
      coal: { numerator: 7, denominator: 1 },
      copper: { numerator: 3, denominator: 2 },
      iron: { numerator: 4, denominator: 2 },
      diamond: { numerator: 3, denominator: 2 },
      ruby: { numerator: 4, denominator: 5 },
      teracotta: { numerator: 4, denominator: 10 },
      esmerald: { numerator: 4, denominator: 5 },
    },
  },
] as const satisfies MinersValuesBase[];

export type MinersType = (typeof miners)[number]["type"];
