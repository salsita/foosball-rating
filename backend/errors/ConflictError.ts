export class ConflictError extends Error {
    readonly httpStatusCode: number
    constructor(message) {
        super(message)
        this.httpStatusCode = 409 
    }
}
