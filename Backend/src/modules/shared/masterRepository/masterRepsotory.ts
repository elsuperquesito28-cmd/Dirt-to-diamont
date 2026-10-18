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
  MasterRepositoryInsertValues,
  MasterRepositorySelectReturn,
  MasterRepositorySelectValues,
  RelationsOfTables,
  SelectMethodsOfDBQuery,
  SelectMethodsQuantity,
  TablesOptions,
} from "./types";
import { EntityDictionary } from "../dictionaries/entitiesDictionary";
import type { FormOfEntityDictionary } from "../dictionaries/types";

export class MasterRepository implements MasterRepositoryBase {
  constructor(private readonly dbClient: typeof db) {}

  async insert<T extends TablesOptions>(
    dates: MasterRepositoryInsertValues<T>,
  ): Promise<Option<true>> {
    const { table, dates: datesOfTheInsert } = dates;
    const tableOfEntity = TablesDictionary[table];
    if (!tableOfEntity) {
      return Result.fail(new UnregistreTableError(table));
    }

    try {
      await this.dbClient.insert(tableOfEntity).values(datesOfTheInsert as any);
      return Result.ok(true);
    } catch (error: any) {
      return Result.fail(new InsertDatabaseError(table, error));
    }
  }

  async select<T extends TablesOptions, E extends SelectMethodsQuantity>(
    dates: MasterRepositorySelectValues<T, E>,
  ): MasterRepositorySelectReturn<T, E> {
    const { table, with: extrasEntities, where, get } = dates;

    let selectMethod: SelectMethodsOfDBQuery =
      get === "many" ? "findMany" : "findFirst";

    let resultQuery;
    try {
      const query = this.dbClient.query[table][selectMethod] as (
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
}
