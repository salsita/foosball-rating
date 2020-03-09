class InputError extends Error {
    constructor(message) {
        super(message)
        this.httpStatusCode = 422 
    }
}

exports.InputError = InputError
