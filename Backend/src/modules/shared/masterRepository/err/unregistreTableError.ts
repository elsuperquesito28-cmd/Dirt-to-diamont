import { RepositoryError } from "../../../../services/error/error";

export class UnregistreTableError extends RepositoryError {
  constructor(table: string) {
    super(
      `The table ${table} is not registered in the dictionary.`,
      "INEXIST_TABLE",
    );

    this.name = "INEXSIST_TABLE_ERROR"
  }
}
