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

export const isValidUserData = (userData: unknown): userData is UserData => {
  const test = userData as UserData
  return typeof test.name === 'string' &&
    test.name.length !== 0 &&
    test.name.trim() === test.name &&
    typeof test.initialRating === 'number'
}
