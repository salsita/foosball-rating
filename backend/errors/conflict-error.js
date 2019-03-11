class ConflictError extends Error {
    constructor(message) {
        super(message)
        this.httpStatusCode = 409 
    }
}

exports.ConflictError = ConflictError
