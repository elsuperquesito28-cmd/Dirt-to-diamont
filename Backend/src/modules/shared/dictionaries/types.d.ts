import type { ID } from "../../../obejct_values/shared/id/interface_ID/interfaceId";
import type {
  BaseEntities,
  BaseForaBaseEntitity,
} from "../interface.base.entities";
import type { TablesOptions } from "../masterRepository/types";

type ConstructorBaseEntity = new (any) =>  BaseEntities<K, ID<string>>
type ConstructorBaseForBaseEntity = new (any) => BaseForaBaseEntitity<K, any, ID<string>>

export type FormOfEntityDictionary = {
  [K in TablesOptions]:
    | ConstructorBaseEntity
    | ConstructorBaseForBaseEntity
};
