import { RepositoryError } from "../../../services/error/error";

export class MinerForceTooLowError extends RepositoryError {
  constructor(force: number) {
    super(
      `The miner force must be greater than 0, but received ${force}.`,
      "MINER_FORCE_TOO_LOW",
    );
    this.name = "MINER_FORCE_TOO_LOW";
  }
}
