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
import {
  miners,
  minerTypes,
  type MinersType,
} from "../../entities_base/miners";
import { sql } from "drizzle-orm";
import { creatorCases } from "../helpers/creatorCase";
import { building, game } from ".";

const TableMinerConfig = {
  id: text("miner_id").primaryKey(),
  gameId: text("miner_game_id")
    .notNull()
    .references(() => GameTable.id),
  buildingId: text("building_id").notNull(),
  toolID: text("miner_tool_id").unique().notNull().unique(),
  type: text("miner_type").notNull().$type<MinersType>(),
  name: text("miner_name").notNull(),
  force: integer("miner_force").notNull(),
  level: integer("miner_level").notNull(),
  capacity: integer("miner_capacity").notNull(),
  updateCost: integer("miner_update_cost").notNull(),
} satisfies BaseColumnsDataBase<IMiner, true>;

export const MinerTable = pgTable("miners", TableMinerConfig, (table) => [
  foreignKey({
    columns: [table.toolID, table.gameId, table.buildingId],
    foreignColumns: [ToolTable.id, game.id, building.id],
  }),
  index("miner_type_index").on(table.type),
  check(
    "check_miner_type_valid",
    sql`${table.type} IN (${minerTypes.map((type) => `'${type}'`).join(", ")})`,
  ),
  check(
    "check_level_valid",
    sql`${table.level} > 0 AND ${table.level} <= ${creatorCases(
      table.type,
      minerTypes,
      miners.map((min) => min.maxLevel),
    )}`,
  ),
  check(
    "check_miner_force",
    sql`${table.force} > 0 AND ${table.force} <= ${creatorCases(
      table.type,
      minerTypes,
      miners.map((min) => min.maxLevel),
      25,
    )}`,
  ),
  check(
    "check_miner_capacity",
    sql`${table.capacity} > 0 AND ${table.capacity} <= ${creatorCases(
      table.type,
      minerTypes,
      miners.map((min) => min.maxCapacity),
    )}`,
  ),
]);
