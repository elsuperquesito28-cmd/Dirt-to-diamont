import { tools, type ToolsType } from "../../../entities_base/tools";
import type { BaseForaBaseEntitity } from "../../shared/interface.base.entities";

/**
 * Base configuration required to create a tool.
 *
 * It combines the shared configuration properties with the value specific
 * to tools. The configuration is selected by its tool type.
 */
export type toolBase = BaseForaBaseEntitity<
  {
    /** Value contributed by the tool while it is being used. */
    value: number;
  },
  ToolsType
>;

/**
 * Provides the initial configuration of a tool type.
 *
 * `ToolBase` reads the matching entry from the central `tools` configuration
 * and exposes only the values needed by the tool domain. It does not
 * represent a tool assigned to a miner; that responsibility belongs to the
 * tool domain entity.
 */
export class ToolBase implements toolBase {
  /** Value contributed by the selected tool type. */
  public readonly value: number;

  /** Maximum progression level allowed for the tool type. */
  public readonly maxLavel: number;

  /** Initial purchase cost of the tool type. */
  public readonly cost: number;

  /** Type of tool represented by this configuration. */
  public readonly type: ToolsType;

  /**
   * Creates a base configuration for a tool type.
   *
   * @param type - Valid tool type whose configuration should be loaded.
   */
  constructor(type: ToolsType) {
    const toolconfig = tools.find((miner) => miner.type === type) ?? tools[0];
    this.type = type;
    this.value = toolconfig.value;
    this.maxLavel = toolconfig.maxLevel;
    this.cost = toolconfig.cost;
  }
}
