import { RepositoryError } from "../../../../services/error/error";

export class InsertDatabaseError extends RepositoryError {
  constructor(table: string, error: any) {
    super(
      `Error inserting data into table ${table}: ${error.message}`,
      "INSERT_ERROR",
    );

    this.name = "DATABASE_ERROR:INSERT_ERROR";
  }
}
