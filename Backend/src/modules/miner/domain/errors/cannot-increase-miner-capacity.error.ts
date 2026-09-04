import { RepositoryError } from "../../../../services/error/error";

export class CannotIncreaseMinerCapacityError extends RepositoryError {
  constructor(
    minerType: string,
    currentCapacity: number,
    maxCapacity: number,
  ) {
    const nextCapacity = currentCapacity + 1;

    super(
      `The ${minerType} miner cannot increase its capacity to ${nextCapacity}. ` +
        `Its current capacity is ${currentCapacity} and its maximum capacity is ${maxCapacity}.`,
      "CANNOT_INCREASE_MINER_CAPACITY",
    );
    this.name = "CANNOT_INCREASE_MINER_CAPACITY";
  }
}
