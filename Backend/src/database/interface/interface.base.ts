import type { NotNull } from "drizzle-orm";
import {
  type PgIntegerBuilderInitial,
  PgTextBuilder,
} from "drizzle-orm/pg-core";

export type BaseColumnsDataBase<T, V extends boolean> = {
  [K in
    | Exclude<keyof T, "probabilities" | "gameId">
    | (V extends true ? "gameId" : never)]:
    | PgIntegerBuilderInitial<any>
    | PgTextBuilder<any>
    | NotNull<any>;
};
