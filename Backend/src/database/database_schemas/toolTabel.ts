import { pgTable, text } from "drizzle-orm/pg-core";

export const ToolTable = pgTable("tools", {
    id: text("id").primaryKey(),
    
})