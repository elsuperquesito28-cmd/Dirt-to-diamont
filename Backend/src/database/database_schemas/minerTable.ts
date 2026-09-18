import {
  check,
  foreignKey,
  index,
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import type { IMiner } from "../../modules/miner/domain/entity/MinerEntity";
import type { BaseColumnsDataBase } from "../interface/interface.base";
import { GameTable } from "./gameTable";
import { ToolTable } from "./toolTable";
import { miners, type MinersType } from "../../entities_base/miners";
import { sql } from "drizzle-orm";

const TableMinerConfig: BaseColumnsDataBase<IMiner, true> = {
  id: text("miner_id").primaryKey(),
  gameId: text("miner_game_id")
    .notNull()
    .references(() => GameTable.id),
  toolID: text("miner_tool_id").unique().notNull().unique(),
  type: text("miner_type").notNull().$type<MinersType>(),
  name: text("miner_name").notNull(),
  force: integer("miner_force").notNull(),
  level: integer("miner_level").notNull(),
  capacity: integer("miner_capacity").notNull(),
  updateCost: integer("miner_update_cost").notNull(),
};

export const MinerTable = pgTable("miners", TableMinerConfig, (table) => [
  foreignKey({
    columns: [table.toolID, table.gameId],
    foreignColumns: [ToolTable.id, ToolTable.gameId],
  }),
  index("miner_type_index").on(table.type),
  check(
    "check_miner_type_valid",
    sql`${table.type} IN ('beginner', 'intermediate', 'expert')`,
  ),
  check(
    "check_level_valid",
    sql`${table.level} > 0 AND ${table.level} <= CASE ${table.type}
      WHEN 'beginner' THEN ${miners[0].maxLevel}
      WHEN 'intermediate' THEN ${miners[1].maxLevel}
      WHEN 'expert' THEN ${miners[2].maxLevel}
    END`,
  ),
  check(
    "check_miner_force",
    sql`${table.force} > 0 AND ${table.force} <= CASE ${table.type}
      WHEN 'beginner' THEN ${miners[0].maxLevel + 25}
      WHEN 'intermediate' THEN ${miners[1].maxLevel + 25}
      WHEN 'expert' THEN ${miners[2].maxLevel + 25}
    END`,
  ),
  check(
    "check_miner_capacity",
    sql`${table.capacity} > 0 AND ${table.capacity} <= CASE ${table.type}
      WHEN 'beginner' THEN ${miners[0].maxCapacity}
      WHEN 'intermediate' THEN ${miners[1].maxCapacity}
      WHEN 'expert' THEN ${miners[2].maxCapacity}
    END`,
  ),
]);
