import type { MinersType } from "../../../entities_base/miners";
import { MinerID } from "../../../obejct_values/miner/id/minerId";

export function createMinerUUID(type: MinersType) {
  const id = crypto.randomUUID();
  return `${MinerID.PREFIX_ID}_${type}_${id}`;
}
