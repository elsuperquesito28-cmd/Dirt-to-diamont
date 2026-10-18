
import type { GameID } from "../../../../obejct_values/game/id/gameId";
import type { UserID } from "../../../../obejct_values/user/id/userId";
import type { UserPassword } from "../../../../obejct_values/user/password/userPasword";

export interface IUSer {
  id: UserID;
  username: string;
  password: UserPassword
  gameId: GameID
}

export class User implements IUSer {
  public readonly id: UserID;
  public username: string;
  public password: UserPassword;
  public gameId: GameID;

  constructor(dates: IUSer) {
    this.id = dates.id
    this.gameId = dates.gameId
    this.username = dates.username
    this.password = dates.password
  }
}