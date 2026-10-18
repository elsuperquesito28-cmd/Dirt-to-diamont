import { RepositoryError } from "../../../../services/error/error";

export class LimitGameLevel extends RepositoryError {
  constructor(level: number, maxLevel: number) {
    super(
      `Failed to upgrade level game, the level "${level}" is equal to the max level "${maxLevel}".`,
      "MAX_LIMIT_LEVEL_UPGRADE",
    );

    this.name = "MAX_LIMIT_LEVEL_UPGRADE";
  }
}
