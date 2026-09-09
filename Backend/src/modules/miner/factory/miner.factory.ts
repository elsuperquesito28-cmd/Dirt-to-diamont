import { miners, type MinersType } from "../../../entities_base/miners";
import { MinerID } from "../../../id/id.miner";
import type { ToolID } from "../../../id/id.tool";
import { Result, type Option } from "../../../services/result/result";
import { Miner, type IMiner } from "../domain/entity/entity.miner";
import { MinerTypeNotFoundError } from "../domain/errors/miner-type-not-found.error";
import { calculateMinerForce } from "../services/create.force";
import { createMinerUUID } from "../services/create.miners.id";

import { createMinerProbabilities } from "../services/create.probabilities.miner";

type CreateMinerArgs = {
  userLevel: number;
  toolID: ToolID;
  userMaxLevel: number;
  prefix: string;
  numberOfName: number;
  type: MinersType;
};
export function createMiner(args: CreateMinerArgs): Option<Miner> {
  const minerConfigByType = miners.find((min) => min.type === args.type);

  if (!minerConfigByType) {
    return Result.fail(new MinerTypeNotFoundError(args.type));
  }

  const probabilities = createMinerProbabilities(minerConfigByType.probs);
  const idString = createMinerUUID(args.prefix, args.type);

  const id = MinerID.create(idString);

  if (!id.isSuccess) return Result.fail(id.error);

  const name = `Miner ${args.type} ${args.numberOfName}`;

  const force = calculateMinerForce(args.userLevel, args.userMaxLevel);

  const minerValues: IMiner = {
    name,
    force: force.level,
    id: id.value,
    type: args.type,
    probabilities,
    level: 1,
    capacity: 1,
    toolID: args.toolID,
    updateCost: minerConfigByType.updateCost,
  };

  return Result.ok(new Miner(minerValues));
}
