import { miners, type MinersType } from "../../../entities_base/miners";
import type { ToolID } from "../../../obejct_values/id/types/toolId";
import type { MinerForce } from "../../../obejct_values/miner/force/miner.force";
import type { MinerID } from "../../../obejct_values/miner/id/minerId";
import { Result, type Option } from "../../../services/result/result";
import { Miner } from "../domain/entity/MinerEntity";
import { MinerTypeNotFoundError } from "../domain/errors/miner-type-not-found.error";
import { createMinerProbabilities } from "../services/createMinersProbabilities";

type CreateMinerArgs = {
  type: MinersType;
  force: MinerForce;
  name: string;
  id: MinerID;
  toolId: ToolID;
};
export function createMiner({
  type,
  force,
  name,
  id,
  toolId,
}: CreateMinerArgs): Option<Miner> {
  const minerConfigByType = miners.find((miner) => miner.type === type) as
    | (typeof miners)[number]
    | undefined;

  if (!minerConfigByType) return Result.fail(new MinerTypeNotFoundError(type));

  const probabilities = createMinerProbabilities(minerConfigByType?.probs);

  return Result.ok(
    new Miner({
      name,
      id,
      toolID: toolId,
      force,
      type,
      level: 1,
      capacity: 1,
      updateCost: minerConfigByType?.updateCost,
      probabilities,
    }),
  );
}
