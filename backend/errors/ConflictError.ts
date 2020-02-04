import { HttpError } from './HttpError';

export class ConflictError extends HttpError {
    constructor(message: string) {
        super(message, 409)
    }
}
