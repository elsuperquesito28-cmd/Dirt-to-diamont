import { miners, type MinersType } from "../../../entities_base/miners";
import type { GameID } from "../../../obejct_values/game/id/gameId";
import type { MinerBaseID } from "../../../obejct_values/miner/base/id/minerBaseID";
import type { BaseForaBaseEntitity } from "../../shared/interface.base.entities";

export type IMinersBase = BaseForaBaseEntitity<
  {
    gameID: GameID;
    maxCapacity: number;
  },
  MinersType,
  MinerBaseID
>;

export class MinerBase implements IMinersBase {
  readonly maxCapacity: number;
  readonly maxLevel: number;
  cost: number;
  readonly type: MinersType;
  readonly id: MinerBaseID;
  readonly gameID: GameID;

  constructor({
    id,
    type,
    gameID,
  }: Omit<IMinersBase, "maxCapacity" | "maxLevel" | "cost">) {
    const minerConfig =
      miners.find((miner) => miner.type === type) ?? miners[0];

    this.maxCapacity = minerConfig.maxCapacity;
    this.type = type;
    this.maxLevel = minerConfig.maxLevel;
    this.cost = minerConfig.cost;
    this.id = id;
    this.gameID = gameID;
  }
}
