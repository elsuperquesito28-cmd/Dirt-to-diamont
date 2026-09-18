import type { AnyPgColumnBuilder } from "drizzle-orm/pg-core";

export type BaseColumnsDataBase<T, V extends boolean> = {
  [K in
    | Exclude<keyof T, "probabilities" | "gameId">
    | (V extends true ? "gameId" : never)]: AnyPgColumnBuilder;
};
