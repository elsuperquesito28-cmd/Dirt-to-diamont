import { integer, pgTable, text, index } from "drizzle-orm/pg-core";
import type { BaseColumnsDataBase } from "../interface/interface.base";
import type { IGame } from "../../modules/game/domain/entity/GameEntity";

const gameTableDates = {
  id: text("id").primaryKey().unique(),
  coins: integer("coins").notNull(),
  limitMiners: integer("limit_miners").notNull(),
  level: integer("level").notNull(),
  clickCoins: integer("click_coins").notNull(),
} satisfies BaseColumnsDataBase<IGame, false>;

export const GameTable = pgTable("game", gameTableDates, (table) => [
  index("idx_id").on(table.id),
]);
