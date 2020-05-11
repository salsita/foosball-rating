export class InputError extends Error {
  readonly httpStatusCode: number
  constructor(message: string) {
    super(message)
    this.httpStatusCode = 422
  }
}
