import type { MinersType } from "../../../entities_base/miners";
import type { MinerID } from "../../../id/id.miner";
import type { Miner } from "../domain/entity/entity.miner";

type MinerRegistry = Record<MinersType, Map<MinerID, Miner>>;

export function validateMinerSelection(
  minerID: unknown,
  miners: unknown,
): {
  minerType: string;
  minerValue: string;
  minersById: Map<MinerID, Miner>;
} {
  if (typeof minerID !== "object" || minerID === null) {
    throw new TypeError("selectMiner expected a non-null MinerID object.");
  }

  const candidateMinerID = minerID as Partial<MinerID>;

  if (
    typeof candidateMinerID.type !== "string" ||
    candidateMinerID.type.length === 0
  ) {
    throw new TypeError(
      "selectMiner expected MinerID.type to be a non-empty string.",
    );
  }

  if (
    typeof candidateMinerID.value !== "string" ||
    candidateMinerID.value.length === 0
  ) {
    throw new TypeError(
      "selectMiner expected MinerID.value to be a non-empty string.",
    );
  }

  if (typeof miners !== "object" || miners === null) {
    throw new TypeError(
      "selectMiner cannot search miners because the miner registry is not initialized.",
    );
  }

  const minersById = (miners as MinerRegistry)[candidateMinerID.type];

  if (!(minersById instanceof Map)) {
    throw new TypeError(
      `selectMiner expected a Map for miner type "${candidateMinerID.type}".`,
    );
  }

  return {
    minerType: candidateMinerID.type,
    minerValue: candidateMinerID.value,
    minersById,
  };
}
