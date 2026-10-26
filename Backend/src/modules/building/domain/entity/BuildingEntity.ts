import type { BuildingTypes } from "../../../../entities_base/buildings";
import type { BuildingId } from "../../../../obejct_values/building/id/buildingId";
import type { GameID } from "../../../../obejct_values/game/id/gameId";
import type { MinerID } from "../../../../obejct_values/miner/id/minerId";
import type { BaseEntities } from "../../../shared/interface.base.entities";

export interface IBuilding extends BaseEntities<BuildingTypes, BuildingId> {
    gameId: GameID   
    level: number
    capacity: number
    minersID: MinerID[] | undefined
}

export class Building {
    
}