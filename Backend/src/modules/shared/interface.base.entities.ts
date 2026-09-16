/**
 * Common properties required by domain entities.
 *
 * This contract allows different entities, such as miners and tools, to
 * share identification and progression properties while keeping their
 * domain-specific properties in their own interfaces.
 *
 * @typeParam T - Union of valid values for the entity type.
 * @typeParam ID - Value object used to identify the entity.
 */
export interface BaseEntities<T, ID> {
  /** Cost required to upgrade the entity. */
  updateCost: number;

  /** Current progression level of the entity. */
  level: number;

  /** Domain type that determines the entity's configuration or behavior. */
  type: T;

  /** Unique identifier value object assigned to the entity. */
  id: ID;
}

/**
 * Common properties required by base configuration objects.
 *
 * This type is intended for static configuration data used to create domain
 * entities. It combines module-specific configuration with shared values
 * such as the initial cost and the maximum level.
 *
 * @typeParam T - Module-specific configuration properties.
 * @typeParam types - Union of valid values for the configuration type.
 */
export type BaseForaBaseEntitity<T, types> = T & {
  /** Maximum level allowed by the configuration. */
  maxLavel: number;

  /** Initial cost associated with the configuration. */
  cost: number;

  /** Type represented by the configuration. */
  type: types;
};
