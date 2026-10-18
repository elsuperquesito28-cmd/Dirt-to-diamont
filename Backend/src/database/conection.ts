import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./database_schemas/index";

const databaseUrl = process.env.DATABASE_URL ?? Bun.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not defined. Add it to your .env file before starting the server.",
  );
}

console.log("holaaaaa");

export const db = drizzle({
  connection: {
    url: databaseUrl,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  },
  schema: schema,
});
