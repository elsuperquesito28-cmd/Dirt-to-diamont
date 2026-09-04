import {
  InvalidIdLength,
  InvalidIdLastPart,
  InvalidIdPrefix,
  InvalidIdType,
} from "../../services/result/errors";
import { Result, type Option } from "../../services/result/result";

export function verifyEntityId(
  prefix: string,
  types: string[],
  id: string,
): Option {
  const minimumLastPartLength = 8;

  const parts = id.split("_");
  const NUMBER_PARTS = 3;
  const lengthId = parts.length;

  const type = parts[1];
  const ifTypeCorrect = type !== undefined && types.includes(type);
  const ifLastPartCorrect =
    parts[2] !== undefined && parts[2].length >= minimumLastPartLength;

  const isIdLengthValid = lengthId !== NUMBER_PARTS;
  const ifPrefixCorrect = parts[0] === prefix;

  if (isIdLengthValid)
    return Result.fail(new InvalidIdLength(id, NUMBER_PARTS));

  if (!ifPrefixCorrect) {
    return Result.fail(new InvalidIdPrefix(id, prefix));
  }
  if (!ifTypeCorrect) return Result.fail(new InvalidIdType(id, types));
  if (!ifLastPartCorrect)
    return Result.fail(new InvalidIdLastPart(id, minimumLastPartLength));

  return Result.ok(true);
}
