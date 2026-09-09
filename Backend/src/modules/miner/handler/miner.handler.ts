import type { MinersType } from "../../../entities_base/miners";
import type { MinerID } from "../../../id/id.miner";
import type { ToolID } from "../../../id/id.tool";
import { Result, type Option } from "../../../services/result/result";
import { MinerBase } from "../base/miners.base";
import { Miner } from "../domain/entity/entity.miner";
import { MinerNotFoundError } from "../domain/errors/miner-not-found.error";
import { buyMiner } from "../services/buy-miner";
import { validateMinerSelection } from "../services/validate-miner-selection";

export class MinerHandler {
  static miners: Record<MinersType, Map<MinerID, Miner>>;
  static base: Record<MinersType, MinerBase>;
  static prefix = "Miner";

  static selectMiner(minerID: MinerID): Option<Miner> {
    const { minerType, minerValue, minersById } = validateMinerSelection(
      minerID,
      this.miners,
    );

    const selectedMiner = minersById.get(minerID);

    if (!selectedMiner)
      return Result.fail(new MinerNotFoundError(minerType, minerValue));

    return Result.ok(selectedMiner);
  }

  static buyMiner({
    minerType,
    userLevel,
    userMaxLevel,
    numberOfName,
    toolID,
  }: {
    minerType: MinersType;
    userLevel: number;
    userMaxLevel: number;
    numberOfName: number;
    toolID: ToolID;
  }): Option<Miner> {
    return buyMiner({
      minerRegistry: this.miners,
      minerType,
      userLevel,
      userMaxLevel,
      numberOfName,
      toolId: toolID,
      minerIdPrefix: this.prefix,
    });
  }

  static undermineAll() {}
}
