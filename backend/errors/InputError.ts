export class InputError extends Error {
    readonly httpStatusCode: number
    constructor(message) {
        super(message)
        this.httpStatusCode = 422 
    }
}
