interface DatesOfBuildings {
  type: string;
  capacity: number;
  cost: number;
  maxLevel: number;
  updateCost: number;
}

export const buildings = [
  {
    type: "small",
    capacity: 10,
    cost: 100,
    maxLevel: 25,
    updateCost: 250,
  },
  {
    type: "medium",
    capacity: 30,
    cost: 1000,
    maxLevel: 30,
    updateCost: 2500,
  },
  {
    type: "big",
    capacity: 100,
    cost: 10000,
    maxLevel: 50,
    updateCost: 25000,
  },
] as const satisfies DatesOfBuildings[];

export type BuildingTypes = (typeof buildings)[number]["type"];

export const buildingTypes = buildings.map((building) => building.type);
