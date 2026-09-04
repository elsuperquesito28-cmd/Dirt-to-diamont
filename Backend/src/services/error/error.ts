export class RepositoryError extends Error {
    constructor (message: string, public code: string) {
        super(message)
        this.name = "repositoryError"
    }
}