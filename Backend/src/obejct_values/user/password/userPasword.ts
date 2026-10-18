import { Result, type Option } from "../../../services/result/result";
import { InvalidPasswordLength } from "../errors/password-invalid-length";

export class UserPassword {
  declare private readonly PasswordBrand: void;
  private constructor(public value: string) {}

  static create(password: string): Option<UserPassword> {
    const PASSWORD_MIN_LENGTH = 8;
    if (password.length > PASSWORD_MIN_LENGTH) {
      return Result.fail(new InvalidPasswordLength());
    }

    return Result.ok(new UserPassword(password));
  }
}
