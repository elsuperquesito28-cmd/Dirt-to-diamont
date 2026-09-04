import { miners, type MinersType } from "../../../entities_base/miners";
import type { BaseForaBaseEntitity } from "../../shared/interface.base.entities";

export type minersBase = BaseForaBaseEntitity<
  {
    maxCapacity: number;
  },
  MinersType
>;

export class MinerBase implements minersBase {
  readonly maxCapacity: number;
  readonly maxLavel: number;
  cost: number;
  readonly type: MinersType;

  constructor(type: MinersType = "beginner") {
    const minerConfig =
      miners.find((miner) => miner.type === type) ?? miners[0];

    this.maxCapacity = minerConfig.maxCapacity;
    this.type = type;
    this.maxLavel = minerConfig.maxLevel;
    this.cost = minerConfig.cost;
  }
}
