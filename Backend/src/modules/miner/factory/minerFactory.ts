import { miners } from "../../../entities_base/miners";
import { Result, type Option } from "../../../services/result/result";
import { Miner } from "../domain/entity/MinerEntity";
import { MinerTypeNotFoundError } from "../domain/errors/miner-type-not-found.error";
import { createMinerProbabilities } from "../services/createMinersProbabilities";

export function createMiner({
  type,
  force,
  name,
  id,
  toolID,
  gameId,
  buildingId,
}: Miner): Option<Miner> {
  const minerConfigByType = miners.find((miner) => miner.type === type) as
    | (typeof miners)[number]
    | undefined;

  if (!minerConfigByType) return Result.fail(new MinerTypeNotFoundError(type));

  const probabilities = createMinerProbabilities(minerConfigByType?.probs);

  return Result.ok(
    new Miner({
      name,
      id,
      toolID,
      buildingId,
      gameId,
      force,
      type,
      level: 1,
      capacity: 1,
      updateCost: minerConfigByType?.updateCost,
      probabilities,
    }),
  );
}
