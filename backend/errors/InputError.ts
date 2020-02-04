import { HttpError } from './HttpError';

export class InputError extends HttpError {
    constructor(message: string) {
        super(message, 422)
    }
}
