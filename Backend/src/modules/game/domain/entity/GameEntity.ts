import { GameID } from "../../../../obejct_values/game/id/gameId";
import { Result, type Option } from "../../../../services/result/result";
import { LimitGameLevel } from "../errors/limit-level-error";

export interface IGame {
  id: GameID;
  coins: number;
  clickCoins: number;
  limitMiners: number;
  level: number;
}

export class Game implements IGame {
  public readonly id: GameID;
  public readonly maxLevel = 25;
  #coins: number;
  #clickCoins: number;
  #limitMiners: number;
  #level: number;
  constructor(dates: IGame) {
    this.id = dates.id;
    this.#coins = dates.coins;
    this.#clickCoins = dates.clickCoins;
    this.#limitMiners = dates.limitMiners;
    this.#level = dates.level;
  }

  upgradeLevel(): Option<true> {
    if (this.#level >= this.maxLevel)
      return Result.fail(new LimitGameLevel(this.level, this.maxLevel));

    this.#level += 1;
    return Result.ok(true);
  }

  updateCoins (value: number) {
    this.#coins += value
  }

  updateClickCoins (value: number) {
    this.#clickCoins += value
  }

  get coins() {
    return this.#coins;
  }
  get clickCoins() {
    return this.#clickCoins;
  }
  get limitMiners() {
    return this.#limitMiners;
  }
  get level() {
    return this.#level;
  }
}
