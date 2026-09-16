import type { Probs } from "../../../../entities_base/miners";
import type { ToolsType } from "../../../../entities_base/tools";
import type { ToolID } from "../../../../obejct_values/tool/id/toolId";
import type { BaseEntities } from "../../../shared/interface.base.entities";

export interface ITool extends BaseEntities<ToolsType, ToolID> {
  /**
   * Probability ratio assigned to each mineral.
   *
   * @example
   * { coal: { numerator: 1, denominator: 1 } }
   */
  probabilities: Probs;

  /**
   * Indicates whether the tool can be assigned to a miner.
   * A tool is unavailable while it is assigned to a miner.
   */
  available: boolean;

  /**
   * Efficiency level contributed by the tool during mining.
   * It is combined with the miner force to calculate total attempts.
   *
   * @example
   * An efficiency level of 3 and a miner force of 5 produce 8 attempts.
   */
  efficienceLevel: number;

  /**
   * It is responsible for increasing or decreasing the peak-related defect probabilities.
   */
  fortuneLevel: number;
}

/**
 * Represents a tool that can be assigned to a miner.
 *
 * The tool stores its mining probabilities, progression data, availability
 * state, and the bonuses it contributes while mining.
 */
export class Tool implements ITool {
  #probabilities: Probs;
  #available: boolean;
  #efficienceLevel: number;
  #fortuneLevel: number;
  #updateCost: number;
  #level: number;
  readonly #type: ToolsType;
  readonly #id: ToolID;

  constructor(value: ITool) {
    this.#probabilities = value.probabilities;
    this.#available = value.available;
    this.#efficienceLevel = value.efficienceLevel;
    this.#fortuneLevel = value.fortuneLevel;
    this.#updateCost = value.updateCost;
    this.#level = value.level;
    this.#type = value.type;
    this.#id = value.id;
  }

  get probabilities() {
    return this.#probabilities;
  }

  get available() {
    return this.#available;
  }

  get efficienceLevel() {
    return this.#efficienceLevel;
  }

  get fortuneLevel() {
    return this.#fortuneLevel;
  }

  get updateCost() {
    return this.#updateCost;
  }

  get level() {
    return this.#level;
  }

  get type() {
    return this.#type;
  }

  get id() {
    return this.#id;
  }
}
