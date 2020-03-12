export class Game {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string
  ) {}
}

export class GameData {
  constructor(
    readonly name: string,
    readonly description: string
  ) {}
}
