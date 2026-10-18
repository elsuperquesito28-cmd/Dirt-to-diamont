import { pgTable, text } from "drizzle-orm/pg-core";
import { GameTable } from "./gameTable";
import type { BaseColumnsDataBase } from "../interface/interface.base";
import type { IUSer } from "../../modules/user/domain/entity/UserEntity";

const UserTableDates = {
  id: text("id").primaryKey(),
  username: text("user_name").notNull().unique(),
  password: text("password").notNull(),
  gameId: text("game_id")
    .unique()
    .references(() => GameTable.id),
} satisfies BaseColumnsDataBase<IUSer, true>;

export const UserTable = pgTable("users", UserTableDates);
