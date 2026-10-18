import {
  InvalidIdLength,
  InvalidIdLastPart,
  InvalidIdPrefix,
  InvalidIdType,
} from "../../../../services/result/errors";
import { Result, type Option } from "../../../../services/result/result";

type returnVerify = {
  prefix: string;
  type: string;
  unique: string;
};
export function verifyEntityGameId(
  prefix: string,
  types: string[],
  id: string,
): Option<returnVerify> {
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

  return Result.ok({
    prefix: parts[0]!,
    type: parts[1]!,
    unique: parts[2]!,
  });
}

export function verifyEntityID(
  prefix: string,
  id: string,
): Option<{ prefix: string; unique: string, id: string }> {
  const partsOfTheID = id.split("_");
  const NUMBER_OF_PARTS = 2;
  const lengthId = partsOfTheID.length;

  const prefixOfId = id[0];

  const ifPrefixCorrect = prefixOfId === prefix;
  const ifLengthCorrect = lengthId === NUMBER_OF_PARTS;

  if (!ifPrefixCorrect) return Result.fail(new InvalidIdPrefix(id, prefix));

  if (!ifLengthCorrect)
    return Result.fail(new InvalidIdLength(id, NUMBER_OF_PARTS));

  return Result.ok({
    prefix,
    unique: id[1]!,
    id,
  });
}
