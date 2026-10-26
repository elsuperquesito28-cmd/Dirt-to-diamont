import { miners, type MinersType } from "../../../../entities_base/miners";
import { Result, type Option } from "../../../../services/result/result";
import { ID } from "../../../shared/id/interface_ID/interfaceId";
import { verifyEntityGameId } from "../../../shared/id/services/idServices";

export class MinerBaseID extends ID<string> {
  declare private readonly MinerBaseIDBrand: void;
  static PREFIX_ID = "Base_miner";
  private constructor(
    value: string,
    public readonly type: MinersType,
    public readonly unique: string,
  ) {
    super(value);
  }

  static create(value: string): Option<MinerBaseID> {
    const types = miners.map((x) => x.type);
    const id = verifyEntityGameId("Miner", types, value);
    if (!id.isSuccess) return id;

    const { type, unique } = id.value;

    return Result.ok(new MinerBaseID(value, type as any, unique));
  }

  static hydrate(id: string) {
    const parts = id.split("_");
    return new MinerBaseID(id, parts[1]! as any, parts[2]!);
  }
}
