import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(Bun.env.DATABASE_URL as string);
export const db = drizzle({ client: queryClient });