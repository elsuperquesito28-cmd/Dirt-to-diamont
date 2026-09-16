import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { GameTable } from "./gameTable";

export const UserTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("user_name").notNull().unique(),
  password: text("password").unique(),
  gameId: text("game_id")
    .unique()
    .references(() => GameTable.id),
});
