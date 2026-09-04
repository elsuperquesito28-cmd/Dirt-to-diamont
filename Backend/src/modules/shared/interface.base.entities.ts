export interface BaseEntities<T, ID> {
  updateCost: number;
  level: number;
  type: T;
  id: ID;
}

export type BaseForaBaseEntitity<T, types> = T & {
  maxLavel: number;
  cost: number;
  type: types
};
