import type { MinersType } from "../../../entities_base/miners";
import { MinerID } from "../../../obejct_values/miner/id/minerId";
import { Result, type Option } from "../../../services/result/result";
import { createMinerUUID } from "./createMinersId";

export const CreateMinerNameAndId = (
  type: MinersType,
  numberOfName: string,
): Option<{ minerId: MinerID; name: string }> => {
  const idString = createMinerUUID(type);
  const id = MinerID.create(idString);

  const name = `miner ${type} ${numberOfName}`;

  if (!id.isSuccess) return Result.fail(id.error);

  return Result.ok({
    minerId: id.value,
    name,
  });
};
