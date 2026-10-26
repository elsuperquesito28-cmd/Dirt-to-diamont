import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import type { TablesOptions } from "../masterRepository/types";
import { GameTable } from "../../../database/database_schemas/gameTable";
import { UserTable } from "../../../database/database_schemas/userTable";
import { MinerTable } from "../../../database/database_schemas/minerTable";
import { ToolTable } from "../../../database/database_schemas/toolTable";
import { buildingTable } from "../../../database/database_schemas/buildingTable";
import { MinerBaseTable } from "../../../database/database_schemas/minerBaseTable";

export const TablesDictionary = {
  game: GameTable,
  user: UserTable,

  //entities of the game
  miner: MinerTable,
  tool: ToolTable,
  building: buildingTable,

  minerBase: MinerBaseTable,
} as const satisfies {
  [K in TablesOptions]: PgTableWithColumns<any>;
};
