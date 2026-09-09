import type { MinersType } from "../../../entities_base/miners";
import type { MinerID } from "../../../id/id.miner";
import type { ToolID } from "../../../id/id.tool";
import { Result, type Option } from "../../../services/result/result";
import type { Miner } from "../domain/entity/entity.miner";
import { MinerTypeNotFoundError } from "../domain/errors/miner-type-not-found.error";
import { createMiner } from "../factory/miner.factory";

type MinerRegistry = Record<MinersType, Map<MinerID, Miner>>;

type BuyMinerArgs = {
  minerRegistry: MinerRegistry;
  minerType: MinersType;
  userLevel: number;
  userMaxLevel: number;
  numberOfName: number;
  toolId: ToolID;
  minerIdPrefix: string;
};

export function buyMiner(args: BuyMinerArgs): Option<Miner> {
  const minersByType = args.minerRegistry[args.minerType];

  if (!minersByType) {
    return Result.fail(new MinerTypeNotFoundError(args.minerType));
  }

  const minerResult = createMiner({
    prefix: args.minerIdPrefix,
    userLevel: args.userLevel,
    userMaxLevel: args.userMaxLevel,
    numberOfName: args.numberOfName,
    type: args.minerType,
    toolID: args.toolId,
  });

  if (!minerResult.isSuccess) {
    return Result.fail(minerResult.error);
  }

  minersByType.set(minerResult.value.id, minerResult.value);

  return Result.ok(minerResult.value);
}
