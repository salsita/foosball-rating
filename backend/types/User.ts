export class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly active: boolean,
  ) {}
}

export class UserInMatches {
  constructor(
    readonly id: number,
    readonly matchRating: number
  ) {}
}

export class UserData {
  constructor(
    readonly initialRating: number,
    readonly name: string
  ) {}
}
