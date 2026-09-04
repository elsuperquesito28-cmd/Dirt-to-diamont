import { RepositoryError } from "../../../../services/error/error";

export class CannotLevelUpMinerError extends RepositoryError {
  constructor(minerType: string, currentLevel: number, maxLevel: number) {
    const nextLevel = currentLevel + 1;

    super(
      `The ${minerType} miner cannot be upgraded to level ${nextLevel}. ` +
        `Its current level is ${currentLevel} and its maximum level is ${maxLevel}.`,
      "CANNOT_LEVEL_UP_MINER",
    );
    this.name = "CANNOT_LEVEL_UP_MINER";
  }
}
