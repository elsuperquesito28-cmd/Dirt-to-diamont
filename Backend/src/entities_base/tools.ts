import type { Probs } from "./miners";

interface ToolsConfig {
  type: string;
  cost: number;
  updateCost: number;
  maxLevel: number;
  probs: Probs;
  value: number
}

const pickProbs: Probs = {
  coal: { numerator: 1, denominator: 1 },
  copper: { numerator: 4, denominator: 5 },
  iron: { numerator: 3, denominator: 4 },
  diamond: { numerator: 1, denominator: 2 },
  ruby: { numerator: 2, denominator: 5 },
  teracotta: { numerator: 1, denominator: 5 },
  esmerald: { numerator: 3, denominator: 5 },
};

const drillProbs: Probs = {
  coal: { numerator: 6, denominator: 5 },
  copper: { numerator: 1, denominator: 1 },
  iron: { numerator: 9, denominator: 10 },
  diamond: { numerator: 3, denominator: 5 },
  ruby: { numerator: 1, denominator: 2 },
  teracotta: { numerator: 2, denominator: 5 },
  esmerald: { numerator: 4, denominator: 5 },
};

const bigDrillProbs: Probs = {
  coal: { numerator: 7, denominator: 5 },
  copper: { numerator: 6, denominator: 5 },
  iron: { numerator: 11, denominator: 10 },
  diamond: { numerator: 4, denominator: 5 },
  ruby: { numerator: 3, denominator: 5 },
  teracotta: { numerator: 1, denominator: 2 },
  esmerald: { numerator: 1, denominator: 1 },
};

export const tools = [
  { type: "pick", cost: 100, updateCost: 2, maxLevel: 25, probs: pickProbs, value: 2 },
  {
    type: "drill",
    cost: 250,
    updateCost: 4,
    maxLevel: 35,
    probs: drillProbs,
    value: 5
  },
  {
    type: "bigDrill",
    cost: 500,
    updateCost: 6,
    maxLevel: 50,
    probs: bigDrillProbs,
    value: 10
  },
] as const satisfies ToolsConfig[];

export type ToolsType = (typeof tools)[number]["type"];
