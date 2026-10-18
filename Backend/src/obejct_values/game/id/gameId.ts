import { Result, type Option } from "../../../services/result/result";
import { ID } from "../../shared/id/interface_ID/interfaceId";
import { verifyEntityID } from "../../shared/id/services/idServices";

export class GameID extends ID<string> {
  declare private readonly GameBrand: void;
  static readonly PREFIX_ID = "Game";
  private constructor(
    value: string,
    public readonly unique: string,
  ) {
    super(value);
  }

  static create(value: string): Option<GameID> {
    const id = verifyEntityID(this.PREFIX_ID, value);
    if (!id.isSuccess) return id;

    const { unique } = id.value;

    return Result.ok(new GameID(id.value.id, unique));
  }

  static hydrate(id: string) {
    const parts = id.split("_");
    return new GameID(id, parts[1]!);
  }
}
