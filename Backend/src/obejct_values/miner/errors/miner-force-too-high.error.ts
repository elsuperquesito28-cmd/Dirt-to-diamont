import { RepositoryError } from "../../../services/error/error";

export class MinerForceTooHighError extends RepositoryError {
  constructor(force: number) {
    super(
      `The miner force must not be greater than 75, but received ${force}.`,
      "MINER_FORCE_TOO_HIGH",
    );
    this.name = "MINER_FORCE_TOO_HIGH";
  }
}
