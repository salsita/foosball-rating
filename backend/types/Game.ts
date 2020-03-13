import { MatchWithId } from './Match'
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

export class FullGame extends Game {
  constructor(
    id: number,
    name: string,
    description: string,
    readonly matches: Array<MatchWithId>
  ) {
    super(id, name, description)
  }
}
