import { RepositoryError } from "../error/error";

export class InvalidIdLength extends RepositoryError {
  constructor(id: string, expectedLength: number) {
    const receivedLength = id.split("_").length;
    super(
      `The id "${id}" has ${receivedLength} parts, but it must have ${expectedLength}.`,
      "INVALID_LENGTH_ID",
    );
    this.name = "INVALID_LENGTH_ID";
  }
}
export class InvalidIdPrefix extends RepositoryError {
  constructor(id: string, expectedPrefix: string) {
    const receivedPrefix = id.split("_")[0] ?? "missing";
    super(
      `The id "${id}" has the prefix "${receivedPrefix}", but it must be "${expectedPrefix}".`,
      "INVALID_PREFIX_ID",
    );
    this.name = "INVALID_PREFIX_ID";
  }
}

export class InvalidIdType extends RepositoryError {
  constructor(id: string, validTypes: string[]) {
    const receivedType = id.split("_")[1] ?? "missing";
    super(
      `The id "${id}" has the type "${receivedType}". Valid types are: ${validTypes.join(", ")}.`,
      "INVALID_TYPES_ID",
    );
    this.name = "INVALID_TYPES_ID";
  }
}

export class InvalidIdLastPart extends RepositoryError {
  constructor(id: string, minimumLength: number) {
    const lastPart = id.split("_")[2] ?? "missing";
    super(
      `The id "${id}" has an invalid last part ("${lastPart}"). It must contain at least ${minimumLength} characters.`,
      "INVALID_LAST_PART_ID",
    );
    this.name = "INVALID_LAST_PART_ID";
  }
}
