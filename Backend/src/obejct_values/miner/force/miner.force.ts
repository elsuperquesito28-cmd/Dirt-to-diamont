import { Result, type Option } from "../../../services/result/result";
import { MinerForceTooHighError } from "../errors/miner-force-too-high.error";
import { MinerForceTooLowError } from "../errors/miner-force-too-low.error";

export class MinerForce {
  private constructor(public force: number) {}

  static create(value: number): Option<MinerForce> {
    if (value <= 0) return Result.fail(new MinerForceTooLowError(value));

    if (value > 75) return Result.fail(new MinerForceTooHighError(value));

    return Result.ok(new MinerForce(value));
  }
}
