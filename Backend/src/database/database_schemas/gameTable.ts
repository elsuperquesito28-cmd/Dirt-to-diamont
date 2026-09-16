import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const GameTable = pgTable("game", {
  id: text("id").primaryKey().unique(),
  coins: integer("coins").notNull(),
  limitMiners: integer("limit_miners").notNull(),
  level: integer("level").notNull(),
  clickCoins: integer("click_coins").notNull(),
});
