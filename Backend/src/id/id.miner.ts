import { miners } from "../entities_base/miners";
import { Result, type Option } from "../services/result/result";
import { ID } from "./interface/interface.id";
import { verifyEntityId } from "./services/id.services";

export class MinerID extends ID<string> {
  declare private readonly MinerIDBrand: void;
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): Option {
    const types = miners.map((x) => x.type);
    const id = verifyEntityId("Miner", types, value);
    if (!id.isSuccess) return id;

    return Result.ok(new MinerID(value));
  }

  static hydrate(id: string) {
    return new MinerID(id);
  }
}
