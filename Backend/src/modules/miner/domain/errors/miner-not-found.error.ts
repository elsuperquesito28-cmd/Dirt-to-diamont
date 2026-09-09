import { RepositoryError } from "../../../../services/error/error";

export class MinerNotFoundError extends RepositoryError {
  constructor(minerType: string, minerId: string) {
    super(
      `The ${minerType} miner with ID "${minerId}" could not be found. ` +
        `Verify that the miner exists and that its type and ID are correct.`,
      "MINER_NOT_FOUND",
    );
    this.name = "MINER_NOT_FOUND";
  }
}
