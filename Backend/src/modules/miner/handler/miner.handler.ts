import type { MinersType } from "../../../entities_base/miners";
import type { MinerID } from "../../../id/id.miner";
import type { Option } from "../../../services/result/result";
import { MinerBase } from "../base/miners.base";
import type { Miner } from "../domain/entity/entity.miner";

export class MinerHandler {
  static miners: Miner[] = [];
  static base: MinerBase[] = [
    new MinerBase(),
    new MinerBase("intermediate"),
    new MinerBase("expert"),
  ];

  static selectMiner (minerID: MinerID): Option<Miner> {
  }

  static buyMiner (type: MinersType) {

  }

  static undermineAll () {}
}
