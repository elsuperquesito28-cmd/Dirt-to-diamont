import { type DBQueryConfig } from "drizzle-orm";
import { db } from "../../../database/conection";
import { Result, type Option } from "../../../services/result/result";
import { TablesDictionary } from "../dictionaries/tables.dictionary";
import { InsertDatabaseError } from "./err/insertErrorTable";
import { SelectDatabaseError } from "./err/selectDatabaseError";
import { SelectResultNotFoundError } from "./err/select-result-not-found.error";
import { UnregistreTableError } from "./err/unregistreTableError";
import type {
  MasterRepositoryBase,
  MasterRepositoryDeleteValues,
  MasterRepositoryInsertValues,
  MasterRepositorySelectReturn,
  MasterRepositorySelectValues,
  RelationsOfTables,
  SelectMethodsOfDBQuery,
  SelectMethodsQuantity,
  TablesOptions,
  TX,
} from "./types";
import { EntityDictionary } from "../dictionaries/entitiesDictionary";
import type { FormOfEntityDictionary } from "../dictionaries/types";
import { DatabaseDeleteError } from "./err/deleteErrorTable";

export class MasterRepository implements MasterRepositoryBase {
  constructor(private readonly dbClient: typeof db) {}

  async transaction<T extends (tx: TX) => Promise<any>>(
    fn: T,
  ): Promise<ReturnType<T>> {
    return await this.dbClient.transaction(fn);
  }

  async insert<T extends TablesOptions>(
    dates: MasterRepositoryInsertValues<T>,
  ): Promise<Option<true>> {
    const { table, dates: datesOfTheInsert } = dates;
    const db = dates.tx ? dates.tx : this.dbClient;

    const tableOfEntity = TablesDictionary[table];
    if (!tableOfEntity) {
      return Result.fail(new UnregistreTableError(table));
    }

    try {
      await db.insert(tableOfEntity).values(datesOfTheInsert as any);
      return Result.ok(true);
    } catch (error: any) {
      return Result.fail(new InsertDatabaseError(table, error));
    }
  }

  async select<T extends TablesOptions, E extends SelectMethodsQuantity>(
    dates: MasterRepositorySelectValues<T, E>,
  ): MasterRepositorySelectReturn<T, E> {
    const { table, with: extrasEntities, where, get } = dates;
    const db = dates.tx ? dates.tx : this.dbClient;

    let selectMethod: SelectMethodsOfDBQuery =
      get === "many" ? "findMany" : "findFirst";

    let resultQuery;
    try {
      const query = db.query[table][selectMethod] as (
        config?: DBQueryConfig<
          E,
          true,
          RelationsOfTables,
          RelationsOfTables[T]
        >,
      ) => Promise<any>;

      resultQuery = await query({
        where,
        with: extrasEntities,
      });
    } catch (e: any) {
      return Result.fail(new SelectDatabaseError(table, e));
    }

    if (get === "one" && resultQuery == null) {
      return Result.fail(new SelectResultNotFoundError(table));
    }

    const entity = (EntityDictionary as Partial<FormOfEntityDictionary>)[table];
    const createEntity = (value: any) => (entity ? new entity(value) : value);
    const result = Array.isArray(resultQuery)
      ? resultQuery.map(createEntity)
      : createEntity(resultQuery);

    return Result.ok(result);
  }

  async delete<T extends TablesOptions>(
    value: MasterRepositoryDeleteValues<T>,
  ): Promise<Option<undefined>> {
    const table = TablesDictionary[value.table];
    const db = value.tx ? value.tx : this.dbClient;

    try {
      await db.delete(table).where(value.where);

      return Result.ok(undefined);
    } catch (e) {
      return Result.fail(new DatabaseDeleteError(value.table));
    }
  }
}
