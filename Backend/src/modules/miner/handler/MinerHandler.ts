import { type MinersType } from "../../../entities_base/miners";
import type { MinerID } from "../../../obejct_values/miner/id/minerId";
import { Result, type Option } from "../../../services/result/result";
import { MinerBase } from "../base/miners.base";
import { Miner } from "../domain/entity/MinerEntity";
import { MinerNotFoundError } from "../domain/errors/miner-not-found.error";

export class MinerHandler {
  static miners: Record<MinersType, Map<MinerID, Miner>>;
  static base: Record<MinersType, MinerBase>;
  static prefix = "Miner";

  static selectMiner(minerID: MinerID): Option<Miner> {
    const selectedMiner = this.miners[minerID.type].get(minerID);

    if (!selectedMiner)
      return Result.fail(new MinerNotFoundError(minerID.type, minerID.value));

    return Result.ok(selectedMiner);
  }

  static buyMiner(miner: Miner) {
    const type = miner.id.type;

    this.miners[type].set(miner.id, miner);
  }

  static undermineAll() {}
}
