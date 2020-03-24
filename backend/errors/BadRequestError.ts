export class BadRequestError extends Error {
  readonly httpStatusCode: number
  constructor(message) {
    super(message)
    this.httpStatusCode = 400
  }
}
