export class Player {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly rating: number,
    readonly active: boolean,
    readonly initialRating: number,
  ) {}
}

export class PlayerInMatches {
  constructor(
    readonly id: number,
    readonly rating: number,
    readonly name: string,
  ) {}
}

export class PlayerToCreate {
  constructor(
    readonly name: string,
    readonly initialRating: number,
  ) {}
}

