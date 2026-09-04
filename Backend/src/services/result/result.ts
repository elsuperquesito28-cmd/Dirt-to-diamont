import type { RepositoryError } from "../error/error";

export class Result {
  static ok<T>(value: T): {
    value: T;
    isSuccess: true;
  } {
    return {
      isSuccess: true,
      value,
    };
  }

  static fail<E extends RepositoryError>(
    error: E,
  ): {
    isSuccess: false;
    error: E;
  } {
    return {
      isSuccess: false,
      error,
    };
  }
}

export type Option<ok, f extends RepositoryError = RepositoryError> =
  | ReturnType<typeof Result.ok<ok>>
  | ReturnType<typeof Result.fail<f>>;
