import type { MinersType } from "../../../entities_base/miners";

export function createMinerUUID(minerPrefix: string, type: MinersType) {
  const id = crypto.randomUUID();
  return `${minerPrefix}_${type}_${id}`;
}
