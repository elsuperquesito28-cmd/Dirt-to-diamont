import { RepositoryError } from "../../../../services/error/error";

export class SelectDatabaseError extends RepositoryError {
  constructor(table: string, error: any) {
    super(`Error in select in the ${table}: ${error}`, "SELECT_DATABAE_ERROR");

    this.name = "DATABASE_SELECT_ERROR";
  }
}
