class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.httpStatusCode = 404 
    }
}

exports.NotFoundError = NotFoundError
