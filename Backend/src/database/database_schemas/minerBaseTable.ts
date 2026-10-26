import { foreignKey, integer, pgTable, text } from "drizzle-orm/pg-core";
import { type IMinersBase } from "../../modules/miner/base/miners.base";
import type { BaseColumnsDataBase } from "../interface/interface.base";
import type { MinersType } from "../../entities_base/miners";
import { game } from ".";

const DatesOfTable = {
  id: text("Miner_base_id").notNull(),
  gameID: text("Miner_base_game_id").notNull(),
  maxCapacity: integer("Miner_base_max_capacity").notNull(),
  maxLevel: integer("Miner_max_level").notNull(),
  type: text("Miner_base_type").$type<MinersType>().notNull(),
  cost: integer("Miner_base_cost").notNull(),
} satisfies BaseColumnsDataBase<IMinersBase, false>;

export const MinerBaseTable = pgTable(
  "Miner_base",
  DatesOfTable,
  (MinerBase) => [
    foreignKey({
      columns: [MinerBase.gameID],
      foreignColumns: [game.id],
    }),
  ],
);
