import {
  boolean,
  check,
  integer,
  pgTable,
  text,
  unique,
} from "drizzle-orm/pg-core";
import type { ITool } from "../../modules/tool/domain/enitity/tools.entity";
import { tools, type ToolsType } from "../../entities_base/tools";
import { sql } from "drizzle-orm";
import type { BaseColumnsDataBase } from "../interface/interface.base";
import { GameTable } from "./gameTable";

const toolsTaable: BaseColumnsDataBase<ITool, true> = {
  type: text("tool_type").notNull().$type<ToolsType>(),
  id: text("id").primaryKey(),
  gameId: text("game_id")
    .notNull()
    .references(() => GameTable.id),
  available: boolean("available").notNull(),
  level: integer("tool_level").notNull(),
  updateCost: integer("tool_update_cost").notNull(),
  fortuneLevel: integer("tool_fortune_level").notNull(),
  efficienceLevel: integer("tool_efficience_level").notNull(),
};

export const ToolTable = pgTable("tools", toolsTaable, (table) => [
  unique("tools_id_game_id_unique").on(table.id, table.gameId),
  check(
    "check_level_valid",
    sql`${table.level} > 0 AND ${table.level} <= ${tools[2].maxLevel}`,
  ),
  check(
    "check_level_ fortune_and_efficience_valid",
    sql`${table.fortuneLevel} > 0 AND ${table.fortuneLevel} <= ${tools[2].maxLevel} AND ${table.efficienceLevel} > 0 AND ${table.efficienceLevel} <= ${tools[2].maxLevel}`,
  ),
]);
