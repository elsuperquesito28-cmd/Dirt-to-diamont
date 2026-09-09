import { RepositoryError } from "../../../../services/error/error";

export class MinerTypeNotFoundError extends RepositoryError {
  constructor(minerType: string) {
    super(
      `No miner configuration was found for the type "${minerType}". ` +
        `Verify that the miner type is valid.`,
      "MINER_TYPE_NOT_FOUND",
    );
    this.name = "MINER_TYPE_NOT_FOUND";
  }
}
