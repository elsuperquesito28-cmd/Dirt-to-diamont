import { tools, type ToolsType } from "../../../entities_base/tools";
import type { GameID } from "../../../obejct_values/game/id/gameId";
import type { ToolBaseID } from "../../../obejct_values/tool/base/id/ToolBaseId";
import type { BaseForaBaseEntitity } from "../../shared/interface.base.entities";

/**
 * Base configuration required to create a tool.
 *
 * It combines the shared configuration properties with the value specific
 * to tools. The configuration is selected by its tool type.
 */
export type IToolBase = BaseForaBaseEntitity<
  {
    gameId: GameID;
    value: number;
  },
  ToolsType,
  ToolBaseID
>;

/**
 * Provides the initial configuration of a tool type.
 *
 * `ToolBase` reads the matching entry from the central `tools` configuration
 * and exposes only the values needed by the tool domain. It does not
 * represent a tool assigned to a miner; that responsibility belongs to the
 * tool domain entity.
 */
export class ToolBase implements IToolBase {
  /** Value contributed by the selected tool type. */
  public readonly value: number;
  /** Value defined a id */
  public readonly id: ToolBaseID;

  /** Value define a gameId, i say the party relational */
  public readonly gameId: GameID;

  /** Maximum progression level allowed for the tool type. */
  public readonly maxLevel: number;

  /** Initial purchase cost of the tool type. */
  public readonly cost: number;

  /** Type of tool represented by this configuration. */
  public readonly type: ToolsType;

  /**
   * Creates a base configuration for a tool type.
   *
   * @param type - Valid tool type whose configuration should be loaded.
   */
  constructor({
    type,
    id,
    gameId,
  }: Omit<IToolBase, "value" | "maxLevel" | "cost">) {
    const toolconfig = tools.find((miner) => miner.type === type) ?? tools[0];
    this.type = type;
    this.gameId = gameId;
    this.id = id;
    this.value = toolconfig.value;
    this.maxLevel = toolconfig.maxLevel;
    this.cost = toolconfig.cost;
  }
}
