import { tools, type ToolsType } from "../../../../entities_base/tools";
import { Result, type Option } from "../../../../services/result/result";
import { ID } from "../../../shared/id/interface_ID/interfaceId";
import { verifyEntityGameId } from "../../../shared/id/services/idServices";

export class ToolBaseID extends ID<string> {
  declare private readonly ToolBaseIDBrand: void;
  static PREFIX_ID = "Base_tool";
  private constructor(
    value: string,
    public readonly type: ToolsType,
    public readonly unique: string,
  ) {
    super(value);
  }

  static create(value: string): Option<ToolBaseID> {
    const types = tools.map((x) => x.type);
    const id = verifyEntityGameId("Miner", types, value);
    if (!id.isSuccess) return id;

    const { type, unique } = id.value;

    return Result.ok(new ToolBaseID(value, type as any, unique));
  }

  static hydrate(id: string) {
    const parts = id.split("_");
    return new ToolBaseID(id, parts[1]! as any, parts[2]!);
  }
}
