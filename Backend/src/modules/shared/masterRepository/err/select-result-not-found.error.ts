import { RepositoryError } from "../../../../services/error/error";

export class SelectResultNotFoundError extends RepositoryError {
  constructor(table: string) {
    super(`No result found in table ${table}.`, "SELECT_RESULT_NOT_FOUND");

    this.name = "SELECT_RESULT_NOT_FOUND_ERROR";
  }
}
