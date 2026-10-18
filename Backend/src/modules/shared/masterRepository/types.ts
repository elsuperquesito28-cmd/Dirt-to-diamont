import type {
  DBQueryConfig,
  ExtractTablesWithRelations,
  SQL,
} from "drizzle-orm";
import type { db } from "../../../database/conection";
import type { Option } from "../../../services/result/result";
import type { TablesDictionary } from "../dictionaries/tables.dictionary";
import type { EntityDictionary } from "../dictionaries/entitiesDictionary";
import * as schema from "../../../database/database_schemas/index";

/**
 * Define the tables that the database accepts.
 */
export type TablesOptions = keyof typeof db.query;

/**
 * Define the methods of de query function
 */
export type SelectMethodsOfDBQuery = keyof typeof db.query.user;

/**
 * Define the quantity acpts the function
 */
export type SelectMethodsQuantity = "many" | "one";

type SchemaConfig = ExtractTablesWithRelations<typeof schema>;
/**
 * defines the type of the "with" parameter for the database query
 */
export type TypeOfwith<T extends keyof SchemaConfig> = DBQueryConfig<
  "many",
  true,
  SchemaConfig,
  SchemaConfig[T]
>["with"];

/**
 * Define the data based on the table.
 */
export type EntitiesDates<T extends TablesOptions> =
  (typeof TablesDictionary)[T]["$inferInsert"];

/**
 * Define the type relation of the tables
 */
export type RelationsOfTables = ExtractTablesWithRelations<typeof schema>;
/**
 * Define the parameters for the "insert" function.
 *
 * @property table - Define the select table
 * @property dates - Define the data to be inserted based on the selected table.
 */
export type MasterRepositoryInsertValues<Table extends TablesOptions> = {
  table: Table;
  dates: EntitiesDates<Table>;
};
/**
 * Define the select function return
 */
export type MasterRepositoryInsertReturn = Promise<Option<true>>;

/**
 * Define the parameter for the "select" function.
 *
 * @param T Define the tables, this type is TablesOption.
 * @param E Define the method for select the dates, this type is SelectMethodsQuantity.
 *
 * @property table - Define the table select.
 * @property where - Define the where of the query.
 * @example
 * const whereOfMyQuery = gt(users.name, "juan")
 *
 * @property with? Define the other entities that will be selected in the query.
 * @example
 * const withOfMyQuery = { game: true }
 *
 * @property get Define the number of items to search for (many | one).
 * @example
 * const getOfMyQuery = "many"
 */
export type MasterRepositorySelectValues<
  T extends TablesOptions,
  E extends SelectMethodsQuantity,
> = {
  table: T;
  where: SQL<unknown>;
  with?: TypeOfwith<T>;
  get: E;
};

type EntityOfTable<T extends TablesOptions> =
  T extends keyof typeof EntityDictionary
    ? InstanceType<(typeof EntityDictionary)[T]>
    : unknown;

type SelectedEntities<
  T extends TablesOptions,
  E extends SelectMethodsQuantity,
> = E extends "many" ? EntityOfTable<T>[] : EntityOfTable<T>;

/**
 * Define the select function return based on the selected query method.
 */
export type MasterRepositorySelectReturn<
  T extends TablesOptions,
  E extends SelectMethodsQuantity = SelectMethodsQuantity,
> = Promise<Option<SelectedEntities<T, E>>>;

export type MasterRepositoryBase = {
  /**
   * This function is responsible for inserting data into any table.
   * @example MasterRepository.insert({
   *  table: "miner",
   *  entity: {
   *    type: "beginner",
   *    ...,
   *    name: "mienr 1"
   *    }
   * })
   *
   * @param dates.table defines the table into which the data will be inserted.
   * @example dates.table = "miner" //refers to the game table
   *
   * @param dates.dates define the data to be inserted.
   * @example dates.entity = {id: "false id",..., limitiners: 3 } //all the fields to be inserted are defined here.
   *
   * @returns returns an Option<true> or an error
   * @example const insertWithProblems = await MasterRepository.insert({table: "game", entity: {...} }) //If an error occurs, it returns {isSuccess: false, error: ErrorRepository error}
   * const insertOk = await MasterRepository.insert({table: "game", entity: {...} }) // If everything goes well, it returns {isSuccess: true, value: true}.
   */
  insert<T extends TablesOptions>(
    dates: MasterRepositoryInsertValues<T>,
  ): MasterRepositoryInsertReturn;

  /**
   * This function is responsible for creating a search query for the database.
   * @example
   * MasterRepository.select({
   * table: "game",
   * where: gt(game.coins, 112),
   * with: { miners: true },
   * get: "many"
   * })
   * @param dates.table Define the table select.
   * @example const tableOfMyQuery: TablesOption = "game"
   * @param dates.where Define the where of the query.
   * @example const whereOfQuery = gt(game.coins, 112)
   * @param dates.with? Define the other entities that will be selected in the query.
   * @example const myWith = { miners: true }
   * @param dates.get Define the number of items to search for (many | one).
   * @example const get = "many"
   */
  select<T extends TablesOptions, E extends SelectMethodsQuantity>(
    dates: MasterRepositorySelectValues<T, E>,
  ): MasterRepositorySelectReturn<T, E>;
};
