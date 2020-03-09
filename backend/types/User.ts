export class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly rating: number,
    readonly active: boolean,
    readonly initialRating: number,
  ) {}
}

export class UserInMatches {
  constructor(
    readonly id: number,
    readonly matchRating: number
  ) {}
}
