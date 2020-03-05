export class NotFoundError extends Error {
    readonly httpStatusCode: number
    constructor(message) {
        super(message)
        this.httpStatusCode = 404 
    }
}
