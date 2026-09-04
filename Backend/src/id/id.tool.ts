import { miners } from "../entities_base/miners";
import { Result, type Option } from "../services/result/result";
import { ID } from "./interface/interface.id";
import { verifyEntityId } from "./services/id.services";

export class ToolID extends ID<string> {
  declare private readonly toolIDBrand: void;
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): Option {
    const types = miners.map((x) => x.type);
    const id = verifyEntityId("Tool", types, value);
    if (!id.isSuccess) return id;

    return Result.ok(new ToolID(value));
  }

  static hydrate(id: string) {
    return new ToolID(id);
  }
}
