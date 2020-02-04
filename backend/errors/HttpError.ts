export class HttpError extends Error {
  readonly httpStatusCode: number
  constructor(message: string, httpStatusCode: number) {
    super(message)
    this.httpStatusCode = httpStatusCode
  }
}
