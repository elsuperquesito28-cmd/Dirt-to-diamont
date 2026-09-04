import type { Minerals } from "../../../../entities_base/minerals";
import type { miners } from "../../../../entities_base/miners";
import type { MinerID } from "../../../../id/id.miner";
import type { ToolID } from "../../../../id/id.tool";
import { Result, type Option } from "./../../../../services/result/result";
import type { BaseEntities } from "./../../../shared/interface.base.entities";
import { CannotIncreaseMinerCapacityError } from "../errors/cannot-increase-miner-capacity.error";
import { CannotLevelUpMinerError } from "../errors/cannot-level-up-miner.error";

type MinerTypes = (typeof miners)[number]["type"];

type probs = {
  [K in (typeof Minerals)[number]["name"]]: [
    denominator: number,
    numerator: number,
  ];
};
export interface IMiner extends BaseEntities<MinerTypes, MinerID> {
  name: string;
  force: number;
  capacity: number;
  level: number;
  toolID: ToolID;
  probabilities: probs;
}

export class Miner implements IMiner {
  name: string;
  #id: MinerID;
  #toolId: ToolID;
  #type: MinerTypes;
  #force: number;
  #capacity: number;
  #level: number;
  #updateCost: number;
  #probabilities: probs;

  constructor(value: IMiner) {
    this.name = value.name;
    this.#id = value.id;
    this.#toolId = value.toolID;
    this.#type = value.type;
    this.#force = value.force;
    this.#capacity = value.capacity;
    this.#level = value.level;
    this.#updateCost = value.updateCost;
    this.#probabilities = value.probabilities;
  }

  changeName(newName: string) {
    this.name = newName;
  }

  changeTool(newToolId: ToolID) {
    this.#toolId = newToolId;
  }

  updateCapacity(maxCapacity: number) {
    if (this.#capacity + 1 > maxCapacity) {
      return Result.fail(
        new CannotIncreaseMinerCapacityError(
          this.#type,
          this.#capacity,
          maxCapacity,
        ),
      );
    }

    this.#capacity += 1;
    return Result.ok(this.#capacity);
  }

  levelUp(maxLevel: number): Option<number> {
    if (this.#level + 1 > maxLevel) {
      return Result.fail(
        new CannotLevelUpMinerError(this.#type, this.#level, maxLevel),
      );
    }

    this.#updateCost = Math.floor(this.#updateCost * 3.15);
    this.#level += 1;
    this.#force += 1;

    return Result.ok(this.#level);
  }

  get id() {
    return this.#id;
  }

  get type() {
    return this.#type;
  }

  get force() {
    return this.#force;
  }

  get capacity() {
    return this.#capacity;
  }

  get level() {
    return this.#level;
  }

  get updateCost() {
    return this.#updateCost;
  }

  get probabilities() {
    return this.#probabilities;
  }

  get toolID() {
    return this.#toolId;
  }
}
