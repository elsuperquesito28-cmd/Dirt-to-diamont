import { RepositoryError } from "../../../../services/error/error";

export class DatabaseDeleteError extends RepositoryError {
  constructor(table: string) {
    super(`Error delete in the ${table}.`, "DELETE_ERROR");

    this.name = "DELETE_ERROR";
  }
}
