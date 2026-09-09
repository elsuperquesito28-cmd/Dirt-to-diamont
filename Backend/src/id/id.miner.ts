import { miners, type MinersType } from "../entities_base/miners";
import { Result, type Option } from "../services/result/result";
import { ID } from "./interface/interface.id";
import { verifyEntityId } from "./services/id.services";

export class MinerID extends ID<string> {
  declare private readonly MinerIDBrand: void;
  private constructor(
    value: string,
    public readonly prefix: string,
    public readonly type: MinersType,
    public readonly unique: string,
  ) {
    super(value);
  }

  static create(value: string): Option<MinerID> {
    const types = miners.map((x) => x.type);
    const id = verifyEntityId("Miner", types, value);
    if (!id.isSuccess) return id;

    const { prefix, type, unique } = id.value;

    return Result.ok(new MinerID(value, prefix, type as any, unique));
  }

  static hydrate(id: string) {
    const parts = id.split("_");
    return new MinerID(id, parts[0]!, parts[1]! as any, parts[2]!);
  }
}
