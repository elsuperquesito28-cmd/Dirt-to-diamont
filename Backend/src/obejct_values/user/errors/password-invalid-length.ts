import { RepositoryError } from "../../../services/error/error";

export class InvalidPasswordLength extends RepositoryError {
    constructor() {
        super("The length of the password is invalid", "INVALID_LENGTH_PASSWORD")
    }
}