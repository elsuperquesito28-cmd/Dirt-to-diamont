import {
  buildings,
  type BuildingTypes,
} from "../../../entities_base/buildings";
import { Result, type Option } from "../../../services/result/result";
import { ID } from "../../shared/id/interface_ID/interfaceId";
import { verifyEntityGameId } from "../../shared/id/services/idServices";

export class BuildingId extends ID<string> {
  declare private readonly BuildingIDBrand: void;
  static PREFIX_ID = "Building";
  private constructor(
    value: string,
    public readonly type: BuildingTypes,
    public readonly unique: string,
  ) {
    super(value);
  }

  static create(value: string): Option<BuildingId> {
    const types = buildings.map((x) => x.type);
    const id = verifyEntityGameId(this.PREFIX_ID, types, value);
    if (!id.isSuccess) return id;

    const { type, unique } = id.value;

    return Result.ok(new BuildingId(value, type as any, unique));
  }

  static hydrate(id: string) {
    const parts = id.split("_");
    return new BuildingId(id, parts[1]! as any, parts[2]!);
  }
}
