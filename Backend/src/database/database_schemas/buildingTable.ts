import {
  check,
  foreignKey,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import type { IBuilding } from "../../modules/building/domain/entity/BuildingEntity";
import type { BaseColumnsDataBase } from "../interface/interface.base";
import {
  buildings,
  buildingTypes,
  type BuildingTypes,
} from "../../entities_base/buildings";
import { game } from ".";
import { sql } from "drizzle-orm";
import { creatorCases } from "../helpers/creatorCase";

const buildingTableDates = {
  id: text("building_id").notNull(),
  gameId: text("building_gameId").notNull(),
  type: text("building_type").$type<BuildingTypes>().notNull(),
  capacity: integer("building_capacity").notNull(),
  level: integer("building_level").notNull(),
  updateCost: integer("building_updateCost").notNull(),
} satisfies Omit<BaseColumnsDataBase<IBuilding, true>, "minersID">;

export const buildingTable = pgTable(
  "buildings",
  buildingTableDates,
  (building) => [
    primaryKey({
      columns: [building.id, building.gameId],
    }),
    foreignKey({
      columns: [building.gameId],
      foreignColumns: [game.id],
    }),
    index("building_type_indx").on(building.type),
    check(
      "check_building_type_valid",
      sql`${building.type} IN (${buildingTypes.map((buildigType) => `'${buildigType}'`).join(", ")})`,
    ),
    check(
      "check_building_level_valid",
      sql`${building.level} > 0 AND ${building.level} <= ${creatorCases(
        building.type,
        buildingTypes,
        buildings.map((building) => building.maxLevel),
      )}`,
    ),
  ],
);
