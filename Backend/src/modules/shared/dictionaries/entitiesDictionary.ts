import { Game } from "../../game/domain/entity/GameEntity";
import { Miner } from "../../miner/domain/entity/MinerEntity";
import { Tool } from "../../tool/domain/enitity/tools.entity";
import { User } from "../../user/domain/entity/UserEntity";
import type { FormOfEntityDictionary } from "./types";

export const EntityDictionary = {
  miner: Miner,
  tool: Tool,
  game: Game,
  user: User
} satisfies FormOfEntityDictionary;
