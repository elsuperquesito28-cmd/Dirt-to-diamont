import { tools, type ToolsType } from "../../../entities_base/tools";
import { Result, type Option } from "../../../services/result/result";
import { ID } from "../../shared/id/interface_ID/interfaceId";
import { verifyEntityId } from "../../shared/id/services/idServices";

export class ToolID extends ID<string> {
  declare private readonly ToolIDBrand: void;
  static PREFIX_ID = "Tool";
  private constructor(
    value: string,
    public readonly type: ToolsType,
    public readonly unique: string,
  ) {
    super(value);
  }

  static create(value: string): Option<ToolID> {
    const types = tools.map((tool) => tool.type);
    const id = verifyEntityId(ToolID.PREFIX_ID, types, value);
    if (!id.isSuccess) return id;

    const { type, unique } = id.value;

    return Result.ok(new ToolID(value, type as ToolsType, unique));
  }

  static hydrate(id: string) {
    const parts = id.split("_");
    return new ToolID(id, parts[1]! as ToolsType, parts[2]!);
  }
}
