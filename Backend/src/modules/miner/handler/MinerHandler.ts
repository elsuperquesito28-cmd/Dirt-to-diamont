import { and, eq } from "drizzle-orm";
import type { MinerID } from "../../../obejct_values/miner/id/minerId";
import { Result, type Option } from "../../../services/result/result";
import type { MasterRepository } from "../../shared/masterRepository/masterRepsotory";
import { Miner, type IMiner } from "../domain/entity/MinerEntity";
import { MinerNotFoundError } from "../domain/errors/miner-not-found.error";
import { miner } from "../../../database/database_schemas";

export class MinerHandler {
  static prefix = "Miner";

  constructor(private readonly repository: MasterRepository) {}

  async selectMiner(minerID: MinerID): Promise<Option<Miner>> {
    const selectedMiner = await this.repository.select({
      table: "miner",
      where: and(eq(miner.id, minerID.value), eq(miner.type, minerID.type))!,
      get: "one",
    });

    if (!selectedMiner.isSuccess)
      return Result.fail(new MinerNotFoundError(minerID.type, minerID.value));

    return Result.ok(selectedMiner.value);
  }

  async buyMiner(miner: IMiner): Promise<Option<true>> {
    const query = await this.repository.insert({
      table: "miner",
      dates: {
        ...miner,
        gameId: miner.gameId.value,
        id: miner.id.value,
        force: miner.force.force,
        toolID: miner.toolID.value,
      },
    });

    if (!query.isSuccess) return Result.fail(query.error);

    return Result.ok(query.value);
  }

  static undermineAll() {}
}
