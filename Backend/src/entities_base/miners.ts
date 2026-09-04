import type { Minerals } from "./minerals";

type Mineral = (typeof Minerals)[number]["name"];

type Probs = {
  [K in Mineral]: readonly [numerator: number, denominator: number];
};

type MinersValuesBase = {
  type: string;
  maxLevel: number;
  maxCapacity: number;
  cost: number;
  probs: Probs;
};

export const miners = [
  {
    type: "beginner",
    cost: 2,
    maxLevel: 25,
    maxCapacity: 7,
    probs: {
      coal: [7, 1],
      copper: [3, 2],
      iron: [4, 2],
      diamond: [3, 2],
      ruby: [4, 5],
      teracotta: [4, 10],
      esmerald: [4, 5],
    },
  },
  {
    type: "intermediate",
    cost: 3,
    maxLevel: 35,
    maxCapacity: 17,
    probs: {
      coal: [7, 1],
      copper: [3, 2],
      iron: [4, 2],
      diamond: [3, 2],
      ruby: [4, 5],
      teracotta: [4, 10],
      esmerald: [4, 5],
    },
  },
  {
    type: "expert",
    cost: 3,
    maxLevel: 50,
    maxCapacity: 25,
    probs: {
      coal: [7, 1],
      copper: [3, 2],
      iron: [4, 2],
      diamond: [3, 2],
      ruby: [4, 5],
      teracotta: [4, 10],
      esmerald: [4, 5],
    },
  },
] as const satisfies MinersValuesBase[];

export type MinersType = (typeof miners)[number]["type"];
